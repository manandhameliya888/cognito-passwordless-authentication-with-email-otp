const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  console.log("Sign In Lambda Function Called ===>>> ", event);
  const { email } = JSON.parse(event.body);

  try {
    const params = {
      AuthFlow: 'CUSTOM_AUTH',
      ClientId: '<Congito App Client ID>',
      AuthParameters: {
        'USERNAME': email,
      }
    };
    const data = await cognitoidentityserviceprovider.initiateAuth(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data })
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'An error occurred' })
    };
  }
};