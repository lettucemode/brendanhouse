/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["SQUARE_ACCESS_TOKEN","EMAIL_TO"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
const { Client, Environment } = require('square')
const aws = require('aws-sdk')
const fs = require('fs')
const MailComposer = require('nodemailer/lib/mail-composer')

exports.handler = async (event) => {

    console.log("Transaction report triggered!");

    // secrets and parameters
    const { Parameters } = await (new aws.SSM())
        .getParameters({
            Names: ['SQUARE_ACCESS_TOKEN', 'EMAIL_TO'].map(secretName => process.env[secretName]),
            WithDecryption: true,
        })
        .promise();
    const token_secret = Parameters.find(p => p.Name.endsWith('SQUARE_ACCESS_TOKEN'));
    if (!token_secret) {
        console.log('Failed to find square access token secret.', Parameters);
        const response = {
            statusCode: 500,
            body: JSON.stringify('Failed to find square access token'),
        };
        return response;
    }
    const emailto_secret = Parameters.find(p => p.Name.endsWith('EMAIL_TO'));
    if (!token_secret) {
        console.log('Failed to find email to.', Parameters);
        const response = {
            statusCode: 500,
            body: JSON.stringify('Failed to find email to.'),
        };
        return response;
    }

    // init square client
    const env = process.env.ENV === 'prod'
        ? Environment.Production
        : Environment.Sandbox;
    const sqClient = new Client({
        environment: env,
        accessToken: token_secret.Value,
    });

    // get list of payments, accounting for pagination
    var today = new Date();
    var firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    var lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    let listPaymentsResponse = await sqClient.paymentsApi.listPayments(
        firstDayOfLastMonth.toISOString(), lastDayOfLastMonth.toISOString(), 'ASC');
    let payments = listPaymentsResponse.result.payments;
    let cursor = listPaymentsResponse.result.cursor;
    while (cursor) {
        listPaymentsResponse = await sqClient.paymentsApi.listPayments(
            firstDayOfLastMonth.toISOString(), lastDayOfLastMonth.toISOString(), 'ASC', cursor);
        payments = payments.concat(listPaymentsResponse.result.payments);
        cursor = listPaymentsResponse.result.cursor;
    }

    // add customer data to each payment
    await Promise.all(payments.map(async payment => {
        const custResponse = await sqClient.customersApi.retrieveCustomer(payment.customerId);
        payment.customer = custResponse.result.customer;    // js decoration whee
    }));

    // write the .csv data
    let csvData = 'Date,Transaction Source,Amount,Purpose\n';
    payments.forEach(payment => {
        csvData += `${payment.createdAt}`
            + `,${payment.customer.givenName} ${payment.customer.familyName}` 
            + `,${payment.amountMoney.amount}`
            + `,${payment.note}` 
            + '\n';
    });
    // fs.writeFileSync('output.csv', data);

    // put the mail data together
    let mailOptions = {
        from: 'no-reply@brendanhouse.com',
        to: emailto_secret.Value,
        subject: 'Monthly transaction report from Square',
        text: 'See attached for transaction report!',
        html: '<p>See attached for transaction report!</p>',
        attachments: [{
            filename: 'transaction_report.csv',
            content: csvData,
        }],
    };
    let mailData = await new MailComposer(mailOptions).compile().build();

    // send dat email bruv
    const ses = new aws.SESV2({ region: "us-east-2" });
    var params = {
        Content: { Raw: { Data: mailData } },
        Destination: {
            ToAddresses: [emailto_secret.Value],
        },
        FromEmailAddress: "no-reply@brendanhouse.com",
    }; 
    const result = await ses.sendEmail(params).promise();
    console.log(result);

    // we did it
    const response = {
        statusCode: 200,
        body: JSON.stringify('all done'),
    };
    return response;
};
