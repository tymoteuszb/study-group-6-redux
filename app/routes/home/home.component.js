import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import FlickrPhotos from './components/flickrPhotos/flickrPhotos.container';
import WeatherWidget from './components/weatherWidget/weatherWidget.container';
import Entertainment from './components/entertainment/entertainment.container';

import { Map } from './map/map.component';
import { PIN_MODE } from '../../modules/map/map.constants'

export class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <Helmet
          title="Homepage"
        />

        <Map
          currentMode={PIN_MODE}
          changeLocationPermissions={this.props.changeLocationPermissions}
          changePosition={this.props.changePosition}
          position={this.props.position}
          changeMode={this.props.changeMode}
          mode={this.props.mode}
          hasLocationPermissions={this.props.hasLocationPermissions}
        />
        <div className="home__content">
          <div className="home__column home__column--half">
            <FlickrPhotos />
          </div>
          <div className="home__column home__column--half">
            <WeatherWidget />
          </div>
          <div className="home__column">
            <Entertainment />
          </div>
        </div>
      </div>
    );
  }
}
