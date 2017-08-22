import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import WeatherWidget from './components/weatherWidget/weatherWidget.container';


export class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <Helmet
          title="Homepage"
        />
        <div className="home__weather">
          <WeatherWidget />
        </div>
      </div>
    );
  }
}
