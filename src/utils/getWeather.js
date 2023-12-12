import {AsyncWeather} from '@cicciosgamino/openweather-apis'

const weather = await new AsyncWeather()

weather.setApiKey(`7d10f616b5d9342cc28dda91313e6cdc`)

class WeatherManager {
  async getWeather(city, lang) {
    if (!city)
      throw new Error(`City is not set!`);
    weather.setLang(lang);
    weather.setCity(city);
    return await weather.getAllWeather();
  }
}

export default WeatherManager;