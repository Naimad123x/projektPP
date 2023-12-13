export default {
  name: "newApiKey",
  execute(email,apiKey,date){
    console.log("new API KEY created: email: %s, key: %s, date: %d", email, apiKey, date)
  }
}