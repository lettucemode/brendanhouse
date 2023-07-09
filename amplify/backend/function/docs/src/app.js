/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["COHORT_1_PASSWORD","COHORT_2_PASSWORD"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_BRENDANHOUSESTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const express = require('express')
const aws = require("aws-sdk");
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// create express server
const app = express()
app.use(express.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS,POST")
  next()
});

app.post('/docs/authenticate', async function(req, res) {    

  const { Parameters } = await (new aws.SSM())
    .getParameters({
      Names: ['COHORT_1_PASSWORD', 'COHORT_2_PASSWORD'].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise()
  const ch1_password = Parameters.find(p => p.Name.endsWith('COHORT_1_PASSWORD'))
  if (!ch1_password) {
    console.log('Failed to find ch1 password secret.', Parameters)
    res.status(500).statusMessage('Internal Server Error').json()
    return
  }
  const ch2_password = Parameters.find(p => p.Name.endsWith('COHORT_2_PASSWORD'))
  if (!ch2_password) {
    console.log('Failed to find ch2 password secret.', Parameters)
    res.status(500).statusMessage('Internal Server Error').json()
    return
  }
  
  if (req.body.password === ch1_password.Value) {
    res.status(200).send({ docs_auth: true, cohort: 1 })
  } else if (req.body.password === ch2_password.Value) {
    res.status(200).send({ docs_auth: true, cohort: 2 })
  } else {
    res.status(200).send({ docs_auth: false, cohort: 0 })
  }
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
