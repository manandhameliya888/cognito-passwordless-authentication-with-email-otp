const _ = require('lodash')
const Chance = require('chance')
const chance = new Chance()
const SES = require('aws-sdk/clients/sesv2')
const ses = new SES()
const { MAX_ATTEMPTS } = require('../lib/constants')
const send_mail = require('../lib/sendmail');

module.exports.handler = async (event) => {
  console.log("Create Auth Event ===>>> ", event);
  if (!event.request.userAttributes.email) {
    throw new Error("Email Not Found!")
  }

  let otpCode
  if (!event.request.session || !event.request.session.length) {
    // new auth session & sending otp to the user's email
    otpCode = chance.string({ length: 6, alpha: false, symbols: false, numeric: true })
    await send_mail(event.request.userAttributes.email, otpCode)
  } else {
    // existing session, user has provided a wrong answer, so we need to
    // give them another chance
    const previousChallenge = _.last(event.request.session)
    const challengeMetadata = previousChallenge?.challengeMetadata

    if (challengeMetadata) {
      // challengeMetadata should start with "CODE-", hence index of 5
      otpCode = challengeMetadata.substring(5)
    }
  }

  const attempts = _.size(event.request.session)
  const attemptsLeft = MAX_ATTEMPTS - attempts
  event.response.publicChallengeParameters = {
    email: event.request.userAttributes.email,
    maxAttempts: MAX_ATTEMPTS,
    attempts,
    attemptsLeft
  }

  // NOTE: the private challenge parameters are passed along to the 
  // verify step and is not exposed to the caller
  // need to pass the secret code along so we can verify the user's answer
  event.response.privateChallengeParameters = {
    secretLoginCode: otpCode
  }

  event.response.challengeMetadata = `CODE-${otpCode}`

  return event
}


