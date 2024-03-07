const AWS = require('aws-sdk')

const ses_config = {
  accessKeyId: "<accessKeyId>",
  secretAccessKey: "<secretAccessKey>",
  region: "<region>"
}

const ses_client = new AWS.SES(ses_config);

const send_mail = async (emailAddress, otpCode) => {
  const params = {
    Destination: {
      ToAddresses: [emailAddress]
    },
    Message: {
      Body: {
        Text: { Data: `Your OTP for login: ${otpCode}` }
      },
      Subject: { Data: 'Login OTP' }
    },
    Source: "manantest123@gmail.com" // Sender email address verified in SES
  };
  return new Promise((res, rej) => {
    ses_client.sendEmail(params).promise()
      .then(data => {
        console.log("Email sent successfully:", data);
        res("Email sent successfully");
      })
      .catch(error => {
        console.error("Error sending email:", error);
        rej(error);
      });
  });
}

module.exports = send_mail;