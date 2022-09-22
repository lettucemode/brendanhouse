/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["asdf"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
const express = require('express')
const aws = require("aws-sdk");
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// create express server
const app = express()
app.use(express.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.post('/email', async function(req, res) {
  console.log('Got request', req.body)
  const ses = new aws.SES({ region: "us-east-2" });
  var params = {
    Destination: {
      ToAddresses: [req.body.emailTo],
    },
    Message: {
      Body: {
        Text: { Data: 
          `
          You can find your receipt here: ${req.body.receiptUrl}.
          Please keep hold of it for your records.
           - Your friends at Brendan House
          ` 
        },
      },
      Subject: { Data: "Thank you for supporting Brendan House! Here's your receipt." },
    },
    Source: "no-reply@brendanhouse.com",
  }; 
  const result = await ses.sendEmail(params).promise()
  console.log(result)
  res.json(result)
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
