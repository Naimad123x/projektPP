import js2xmlparser from "js2xmlparser";
import WeatherM from "../../../utils/getWeather.js";
import {logger} from "../../app.js";

const WeatherManager = new WeatherM();
export async function location(req, res) {
  const {city} = req.params;
  const lang = req.query.lang ?? "EN";
  const format = req.query.format ?? "json";
  if (!city)
    return res.send({"error": "No city provided"});

  logger.newApiRequest({
    location: city,
    params: {
      params: req.params,
      query: req.query,
    },
    date: Date.now()
  });

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
}