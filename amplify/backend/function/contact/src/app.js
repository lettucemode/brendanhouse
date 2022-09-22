/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["EMAIL_TO"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["EMAIL_TO"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
const express = require('express')
const aws = require("aws-sdk");
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

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

const escapeHTML = str => str.replace(/[&<>'"]/g, 
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));

app.post('/contact', async function(req, res) {
  console.log('Got request', req.body)
  const ses = new aws.SES({ region: "us-east-2" });

  const { Parameters } = await (new aws.SSM())
      .getParameters({
          Names: ['EMAIL_TO'].map(secretName => process.env[secretName]),
          WithDecryption: true,
      })
      .promise();
  const emailto_secret = Parameters.find(p => p.Name.endsWith('EMAIL_TO'));
  if (!emailto_secret) {
      console.log('Failed to find email to secret.', Parameters);
      const response = {
          statusCode: 500,
          body: JSON.stringify('Failed to find email to secret.'),
      };
      return response;
  }
  const emailTos = emailto_secret.Value.split(';')
  var params = {
    Destination: {
      ToAddresses: emailTos,
    },
    Message: {
      Body: {
        Html: { Data: 
          `
          <p>Someone filled out the contact form for Brendan House.</p>
          <p>Their name: ${escapeHTML(req.body.firstName)} ${escapeHTML(req.body.lastName)}</p>
          <p>Their email address: ${escapeHTML(req.body.email)}</p>
          <p>And here's the content of their message:</p>
          <pre>${escapeHTML(req.body.message)}</pre>
          ` 
        },
      },
      Subject: { Data: "Brendan House - contact form submission" },
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
