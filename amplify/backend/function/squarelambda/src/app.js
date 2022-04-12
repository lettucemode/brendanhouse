const express = require('express')
const { Client, Environment } = require('square')
const { nanoid } = require('nanoid')
const aws = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// create express server
const app = express()
app.use(express.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});

app.post('/square', async function(req, res) {

  console.log('Got request', req.body)

  // secrets and parameters
  const { Parameters } = await (new aws.SSM())
    .getParameters({
      Names: ['SQUARE_ACCESS_TOKEN'].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise()
  const token_secret = Parameters.find(p => p.Name.endsWith('SQUARE_ACCESS_TOKEN'));
  if (!token_secret) {
    console.log('Failed to find square access token secret.', Parameters);
    res.status(500).statusMessage('Internal Server Error').json();
    return;
  }

  // init square client
  const env = process.env.ENV === 'prod'
    ? Environment.Production
    : Environment.Sandbox;
  const sqClient = new Client({
    environment: env,
    accessToken: token_secret.Value,
  })

  // find existing customer by email
  const searchCustomersBody = {
    'limit': 1,
    'query': {
      'filter': {
        'emailAddress': {
          'exact': req.body.payerEmail, 
        },
      },
    },
  }
  const { result: searchResult, ...searchResponse } = await sqClient.customersApi.searchCustomers(searchCustomersBody);
  console.log('Customer search result', searchResult);
  
  // if this is a prior customer based on the email, grab the id for the payment request
  if (searchResult.customers && searchResult.customers.length === 1) {
    customerId = searchResult.customers[0].id
  } else {
    // otherwise, create the new customer and use that id
    const createCustomerBody = {
      idempotencyKey: nanoid(),
      givenName: req.body.payerFname,
      familyName: req.body.payerLname,
      emailAddress: req.body.payerEmail,
    }
    const { result: createResult, ...createResponse } = await sqClient.customersApi.createCustomer(createCustomerBody);
    console.log('Customer create result', createResult)
    customerId = createResult.customer.id
  }

  // figure out the note
  let note = 'UNKNOWN PAYMENT TYPE';
  if (req.body.paymentType === 1) {
    note = 'APPLICATION FEE'
  } else if (req.body.paymentType === 2) {
    note = 'DEPOSIT'
  } else if (req.body.paymentType === 3) {
    note = 'TUITION PAYMENT'
  } else if (req.body.paymentType === 4) {
    note = 'DONATION'
  } else if (req.body.paymentType === 5) {
    note = 'SPIRITUAL DIRECTION'
  }
  
  // now submit the payment
  const paymentBody = {
    idempotencyKey: nanoid(),
    sourceId: req.body.token,
    amountMoney: {
      amount: req.body.amount,
      currency: 'USD',
    },
    customerId,
    note,
  }
  const { result: paymentResult, ...paymentResponse } = await sqClient.paymentsApi.createPayment(paymentBody);

  BigInt.prototype.toJSON = function() { return Number(this) } // workaround for BigInt serialization error
  console.log(paymentResult)
  res.json(paymentResult)
});

app.listen(3000, function() {
    console.log('App started')
});

module.exports = app
