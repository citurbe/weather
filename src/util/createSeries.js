const createSeries = (data, key) => {
  const series = {};
  data.forEach(element => {
    series[element.dt_txt] = element.main[key];
  });
  return series;
};

export default createSeries;
