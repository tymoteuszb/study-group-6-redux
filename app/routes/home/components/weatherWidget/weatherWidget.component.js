
import React, { PureComponent, PropTypes } from 'react';
import {Card, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';


export class WeatherWidget extends PureComponent {
  static propTypes = {
    weather: PropTypes.object.isRequired,
    getWeather: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getWeather(52.4004454, 16.7612416);
  }

  render() {
    const gotWeather = !!this.props.weather
    return (
      <div className="weather-widget">
        <Card>
          <CardHeader
            title="Current weather"
          />

          {!gotWeather ? <CircularProgress size={80} thickness={5} /> : null}
          {this.props.weather.map((weather) => (
            <CardMedia key={weather.get('id')}>
              <div className="weather-box">
                <div className="weather-box__right">
                  <i className={weather.get('modernIcon')} />
                  <span className="weather-box__temp">{weather.get('temp')}</span>
                  <span className="weather-box__localization">{weather.get('localization')}</span>
                  <span className="weather-box__pressure">{weather.get('pressure')}</span>
                </div>
              </div>
              <img className="" src="http://cdn.wallpapersafari.com/71/36/JPEBlv.jpg" alt="" />
            </CardMedia>
          ))}
        </Card>
      </div>
    );
  }
}
