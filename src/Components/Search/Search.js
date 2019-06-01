import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getForecastByLatLon,
  getForecastByCity,
  getForecastByZip,
  setUnits
} from '../../Store/actions';
import './search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: '',
      lon: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch(oppositeValue) {
    let metric;
    if (oppositeValue) {
      metric = oppositeValue === 'metric';
    } else {
      metric = this.props.metric;
    }

    if (this.state.lat && this.state.lon) {
      this.props.getForecastByLatLon(this.state.lat, this.state.lon, metric);
    } else if (this.state.zip) {
      this.props.getForecastByZip(this.state.zip, metric);
    } else if (this.state.city) {
      this.props.getForecastByCity(this.state.city, metric);
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          if (!position) {
            console.error('no position found');
          } else {
            this.props.getForecastByLatLon(
              position.coords.latitude,
              position.coords.longitude,
              metric
            );
          }
        });
      } else {
        console.error('no geolocation available');
      }
    }
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.lat && this.state.lon) {
      this.props.getForecastByLatLon(
        this.state.lat,
        this.state.lon,
        this.props.metric
      );
    } else if (this.state.zip) {
      this.props.getForecastByZip(this.state.zip, this.props.metric);
    } else if (this.state.city) {
      this.props.getForecastByCity(this.state.city, this.props.metric);
    }
  }

  handleClick(e) {
    e.preventDefault();
    const oppositeValue = this.props.metric ? 'imperial' : 'metric';
    this.props.setUnits(oppositeValue);
    this.performSearch(oppositeValue);
  }

  render() {
    const friendlyName = this.props.metric ? 'Celcius' : 'Fahrenheit';
    const oppositeName = this.props.metric ? 'Fahrenheit' : 'Celcius';
    return (
      <div>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="search__container">
            <label htmlFor="city">City:</label>
            <input name="city" type="text" />
          </div>
          <p>--OR--</p>
          <div className="search__container">
            <label htmlFor="lat">Latitude:</label>
            <input name="lat" type="text" />
            <label htmlFor="lon">Longitude:</label>
            <input name="lon" type="text" />
          </div>
          <p>--OR--</p>
          <div className="search__container">
            <label htmlFor="zip">Zip Code:</label>
            <input name="zip" type="text" />
          </div>
          <input type="submit" value="Search" />
        </form>
        <div className="search__container">
          Showing temperature in {friendlyName}.{' '}
          <a href="" onClick={this.handleClick}>
            Switch to {oppositeName}{' '}
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    metric: state.config.units === 'metric'
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getForecastByCity,
      getForecastByLatLon,
      getForecastByZip,
      setUnits
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
