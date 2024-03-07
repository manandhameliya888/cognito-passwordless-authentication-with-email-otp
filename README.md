# Description
It contain the Signup and Sign in with cognito
Its ability is to login the using without password
By implementing this you can achieve passwordless authentication with email using AWS Cognito

# passwordless-email-otp-cognito-demo

How to implement passwordless login using OTP with Cognito.

If you want to deploy this in your AWS account and try it out then you need to:

1. Create and verify a domain identity in SES, see [here](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html)

2. In the `serverless.yml`, replace `custom.domain` with your SES domain.

3. Run `npm ci` at the project root to restore project dependencies.

4. Run `npx sls deploy` at the project root to deploy the project to the `eu-west-1` region.
