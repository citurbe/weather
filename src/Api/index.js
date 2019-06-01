import axios from 'axios';
import urls from './urls';
import { WEATHER_KEY } from '../util/constants';

export const getForecastByCity = (city, metric) => {
  const url = `${urls.FORECAST_URL}?q=${city},us&units=${
    metric ? 'metric' : 'imperial'
  }&APPID=${WEATHER_KEY}`;
  return axios.get(url);
};

export const getForecastByLatLon = (lat, lon, metric) => {
  const url = `${urls.FORECAST_URL}?lat=${lat}&lon=${lon}&units=${
    metric ? 'metric' : 'imperial'
  }&APPID=${WEATHER_KEY}`;
  return axios.get(url);
};

export const getForecastByZip = (zip, metric) => {
  const url = `${urls.FORECAST_URL}?zip=${zip},us&units=${
    metric ? 'metric' : 'imperial'
  }&APPID=${WEATHER_KEY}`;
  return axios.get(url);
};

export default {
  getForecastByCity,
  getForecastByLatLon,
  getForecastByZip
};
