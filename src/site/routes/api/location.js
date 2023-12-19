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


  try{


    logger.newApiRequest({
      location: city,
      params: {
        params: req.params,
        query: req.query,
      },
      date: Date.now()
    });


    let response = await WeatherManager.getWeather(city, lang);
    if(response) {
      response.iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      response.rateLimit = req.rateLimit;
    }
    console.log(format)
    if(format === `xml`) {

      console.log(response)
      const xmlResponse = js2xmlparser.parse("data", response, {replaceInvalidChars: true});
      console.log(xmlResponse)
      await res.set('Content-Type', 'text/xml');
      return await res.send(xmlResponse);

    } else {

      return await res.json(response)

    }


  }catch(e){

    console.log(e)
    return res.send(e)

  }
}