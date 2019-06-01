import { combineReducers } from 'redux';

const weatherDefault = {
  forecast: []
};

export const config = (state = { units: 'imperial' }, action) => {
  switch (action.type) {
    case 'SET_UNITS':
      return Object.assign({}, state, { units: action.payload });
    default:
      return state;
  }
};

export const weather = (state = weatherDefault, action) => {
  switch (action.type) {
    case 'RECEIVE_FORECAST':
      return Object.assign({}, state, { forecast: action.payload.list });
    default:
      return state;
  }
};

export const city = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_FORECAST':
      return Object.assign({}, state, {
        name: action.payload.city.name,
        pop: action.payload.city.population
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({ weather, city, config });

export default rootReducer;
