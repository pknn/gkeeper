import fetch from 'node-fetch';

export default {
  current: async (request, response) => {
    const { latitude, longitude } = request.query;
    const { WEATHER_API_CURRENT_ENDPOINT, WEATHER_API_KEY } = process.env;
    try {
      const data = await fetch(
        `${WEATHER_API_CURRENT_ENDPOINT}?APPID=${WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`
      );
      const json = await data.json();
      response.json(json);
    } catch (error) {
      response.status(400).send(error);
    }
  },
  forecast: async (request, response) => {
    const { latitude, longitude } = request.query;
    const { WEATHER_API_FORECAST_ENDPOINT, WEATHER_API_KEY } = process.env;
    try {
      const data = await fetch(
        `${WEATHER_API_FORECAST_ENDPOINT}?APPID=${WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`
      );
      const json = await data.json();
      response.json(json);
    } catch (error) {
      response.status(400).send(error);
    }
  }
};
