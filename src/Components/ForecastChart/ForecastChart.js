import React from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import './forecastChart.css';

const ForecastChart = props => {
  return (
    <div className="forecast-chart">
      <h4>{props.title}</h4>
      <LineChart colors={[props.color]} data={props.data} width="90%" />
    </div>
  );
};

export default ForecastChart;
