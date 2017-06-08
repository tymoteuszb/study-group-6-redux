import React, { PureComponent, PropTypes } from 'react';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import weather0 from './weather/0.jpg';
import weather20 from './weather/20.jpg';
import weather40 from './weather/40.jpg';
import weather60 from './weather/60.jpg';
import weather80 from './weather/80.jpg';
import weather100 from './weather/100.jpg';

const weatherBackgroundMap = {
  0: weather0,
  20: weather20,
  40: weather40,
  60: weather60,
  80: weather80,
  100: weather100,
};

export class WeatherWidget extends PureComponent {
  static propTypes = {
    weather: PropTypes.object.isRequired,
    getWeather: PropTypes.func.isRequired,
  };

  render() {
    const weather = this.props.weather.get(0);
    const weatherBg = (cloudsStr) => {
      const clouds = parseInt(cloudsStr, 10);
      if (clouds >= 90) {
        return 100;
      }
      if (clouds >= 70) {
        return 80;
      }
      if (clouds >= 50) {
        return 60;
      }
      if (clouds >= 30) {
        return 40;
      }
      if (clouds >= 10) {
        return 20;
      }
      return 0;
    };

    return (
      <div className="weather-widget">
        <Card>
          <CardHeader
            title="Current weather"
          />

          { !weather || !weather.size ?
            <div className="flickr-photos__loader"><CircularProgress size={80} thickness={5} /></div>
            :
            <CardMedia key={weather.get('id')}>
              <div className="weather-box">
                <div className="weather-box__right">
                  <i className={weather.get('modernIcon')} />
                  <span className="weather-box__temp">{weather.get('temp')}</span>
                  <span className="weather-box__localization">{weather.get('localization')}</span>
                  <span className="weather-box__pressure">{weather.get('pressure')}</span>
                </div>
              </div>
              <img className="" src={weatherBackgroundMap[weatherBg(weather.get('clouds'))]} alt="" />
            </CardMedia>
          }
        </Card>
      </div>
    );
  }
}
