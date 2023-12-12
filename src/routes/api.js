import * as express from "express";
import WeatherM from "../utils/getWeather.js";
const api = express.Router();
import js2xmlparser from 'js2xmlparser';
import authenticateKey from "../utils/authenticate.js";

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

api.get(`/city/:city`,authenticateKey, async (req, res) => {
  const {city} = req.params;
  const lang = req.query.lang ?? "EN";
  const format = req.query.format ?? "json";
  if (!city)
    return res.send({"error": "No city provided"});
  try{
    let response = await WeatherManager.getWeather(city, lang);
    if(response)
      response.iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
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

export default api;