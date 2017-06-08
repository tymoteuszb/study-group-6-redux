import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';

import FlickrPhotos from './components/flickrPhotos/flickrPhotos.container';
import Incidents from './components/incidents/incidents.container';
import WeatherWidget from './components/weatherWidget/weatherWidget.container';
import Entertainment from './components/entertainment/entertainment.container';

import { Map } from './components/map/map.component';

export class Home extends PureComponent {
  static propTypes = {
    changeLocationPermissions: PropTypes.func.isRequired,
    changePosition: PropTypes.func.isRequired,
    changeMode: PropTypes.func.isRequired,
    hasLocationPermissions: PropTypes.bool.isRequired,
    position: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="home">
        <Helmet
          title="Homepage"
        />

        <Map
          currentMode={this.props.mode}
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
          <div className="home__column home__column--half">
            <Incidents />
          </div>
          <div className="home__column">
            <Entertainment />
          </div>
        </div>
      </div>
    );
  }
}
