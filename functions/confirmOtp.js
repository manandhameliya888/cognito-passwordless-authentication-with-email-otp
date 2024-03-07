const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  console.log("Confirm OTP Lambda Function Called ===>>>>", event);

  const { email, code, session } = JSON.parse(event.body);
  try {
    const params = {
      ChallengeName: 'CUSTOM_CHALLENGE',
      ClientId: '<Congito App Client ID>', // Congito App Client ID
      ChallengeResponses: {
        USERNAME: email,
        ANSWER: code
      },
      Session: session // Extract session token from Authorization header
    };

    const data = await cognito.respondToAuthChallenge(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
