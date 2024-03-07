module.exports.handler = async (event) => {
  console.log("Pre Sign UP Lambda Trigger EVENT ====>>>>>", event);

  event.response.autoConfirmUser = true
  return event
}