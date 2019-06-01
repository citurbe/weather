import ForecastApi from '../Api';

export const receiveForecast = data => {
  return { type: 'RECEIVE_FORECAST', payload: data };
};

export const getForecastByZip = (zip, metric = false) => {
  return dispatch => {
    return ForecastApi.getForecastByZip(zip, metric)
      .then(response => {
        dispatch(receiveForecast(response.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const getForecastByCity = (city, metric = false) => {
  return dispatch => {
    return ForecastApi.getForecastByCity(city, metric)
      .then(response => {
        dispatch(receiveForecast(response.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const getForecastByLatLon = (lat, lon, metric = false) => {
  return dispatch => {
    return ForecastApi.getForecastByLatLon(lat, lon, metric)
      .then(response => {
        dispatch(receiveForecast(response.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const setUnits = units => {
  return { type: 'SET_UNITS', payload: units };
};
