import * as express from "express";
import WeatherM from "../../utils/getWeather.js";
import js2xmlparser from 'js2xmlparser';
import authenticateKey from "../../utils/authenticate.js";
import emailRegex from "email-regex-safe";
import {getApiKey, saveApiKey} from "../../utils/storage.js";
import {messageBuilder, sendMail} from "../../utils/mailer.js";
import {format} from 'date-fns';
import crypto from 'crypto';

const api = express.Router();
const WeatherManager = new WeatherM();

api.get(`/info`, async (req, res) => {
  return res.send(
    `<head><title>API Guide</title><link rel="stylesheet" href="/style.css"></head>`+
    `<body><b>Type city name after /api/</b><br>`+
    `Examples: /api/city/london<br><br>`+
    `<b>You can change language of response by adding query: ?lang={lang}</b><br>`+
    `Examples: /api/city/london?lang=it<br><br>`+
    `<b>Default response format in in JSON. You can change that to xml by adding query ?format=xml</b><br><br>`+
    `<b>Authorization: To use our API you have to use key by adding query ?key={key}</b>`+
    `</body>`
  )
})

api.get(`/location/:city`,authenticateKey, async (req, res) => {
  const {city} = req.params;
  const lang = req.query.lang ?? "EN";
  const format = req.query.format ?? "json";
  if (!city)
    return res.send({"error": "No city provided"});
  try{
    let response = await WeatherManager.getWeather(city, lang);
    if(response) {
      response.iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      response.rateLimit = req.rateLimit;
    }
    if(format === `xml`) {
      const xmlResponse = js2xmlparser.parse("data", response);
      res.set('Content-Type', 'text/xml');
      return res.send(xmlResponse);
    } else {
      return res.json(response)
    }
  }catch(e){
    return res.send(e)
  }
})

api.post(`/api-key-request`, async (req, res) => {
  const {email} = req.body;
  if(!emailRegex({ exact: true }).test(email))
    return res.sendStatus(400)
  const hashedEmail = hashEmail(email);
  const accountExists = await getApiKey(hashedEmail);
  if(accountExists.length > 0){
    const date = accountExists[0].date;
    const formattedDate = format(new Date(Number(date)), "dd/MM/yyyy");
    return res.status(400).send({error: `The email provided already has an API KEY. Creation date: ${formattedDate}`});
  }else{

    const apiKey = genAPIKey();

    await saveApiKey(email,hashedEmail,apiKey,Date.now());

    await sendMail(email,
      messageBuilder(
        email,
        `API KEY for weather forecast`,
        `Your API KEY is:\n\n${apiKey}`,
        `<h3>Your API KEY is:</h3><br><br><h2 style="color:#8a9fe6">${apiKey}</h2>`
      )
    )

    return res.status(200).send({message: `API KEY was send to your email "${email}"`});

  }

})


const genAPIKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(64)]
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
};

function hashEmail(email) {
  return crypto.createHash('sha256').update(email).digest('hex');
}

export default api;