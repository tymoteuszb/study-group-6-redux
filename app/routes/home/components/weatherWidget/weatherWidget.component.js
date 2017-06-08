
import React, { PureComponent, PropTypes } from 'react';
import {Card, CardHeader } from 'material-ui/Card';
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
          Weather Widget
          {!gotWeather ? <CircularProgress size={80} thickness={5} /> : null}
          {this.props.weather.map((weather) => (
            <GridTile
              key={weather.get('id')}
              title={weather.get('temp')}
            >

            <i className={weather.get('modernIcon')}></i>
              <img src={weather.get('icon')} />
            </GridTile>
          ))}
        </Card>
      </div>
    );
  }
}
