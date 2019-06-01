import React from 'react';
import { connect } from 'react-redux';
import ForecastChart from '../ForecastChart/ForecastChart';
import createSeries from '../../util/createSeries';

const Weather = props => {
  const temp = createSeries(props.forecast, 'temp');
  const hum = createSeries(props.forecast, 'humidity');
  const press = createSeries(props.forecast, 'pressure');
  return (
    <div>
      {props.city && (
        <h3>
          Showing the weather for {props.city}
          {props.pop &&
            `, currently being experienced by
          ${props.pop.toLocaleString()} people!`}
        </h3>
      )}
      {Object.keys(temp).length > 0 && (
        <ForecastChart color="blue" title="Temperature" data={temp} />
      )}
      {Object.keys(hum).length > 0 && (
        <ForecastChart color="orange" title="Humidity" data={hum} />
      )}
      {Object.keys(press).length > 0 && (
        <ForecastChart color="red" title="Pressure" data={press} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  forecast: state.weather.forecast,
  city: state.city.name,
  pop: state.city.pop
});

export default connect(mapStateToProps)(Weather);
