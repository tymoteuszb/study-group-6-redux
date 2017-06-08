import React, { PureComponent, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions } from 'material-ui/Card';
import { when, isNil, complement, equals, cond, pipe, or, prop } from 'ramda';

import { PositionMarker } from './positionMarker/positionMarker.component';
import { CoordinatesPanel } from './coordinatesPanel/coordinatesPanel.component';
import { LocationPanel } from './locationPanel/locationPanel.component';
import { PIN_MODE, COORDINATES_MODE, LOCATION_MODE } from '../../../../modules/map/map.redux';
import { mapStyles } from './map.styles';

const isLocationMode = equals(LOCATION_MODE);
const isCoordinatesMode = equals(COORDINATES_MODE);
const isPinMode = equals(PIN_MODE);

export class Map extends PureComponent {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
    hasLocationPermissions: PropTypes.bool.isRequired,
    changeLocationPermissions: PropTypes.func.isRequired,
    changePosition: PropTypes.func.isRequired,
    changeMode: PropTypes.func.isRequired,
    zoom: PropTypes.number.isRequired,
  };

  static defaultProps = {
    zoom: 12,
    hasLocationPermissions: false,
  };

  componentWillMount() {
    this.props.changePosition(52.414263, 16.920183);
  }

  componentDidMount = () => {
    this.getLocationPermissions();
    this.getCurrentLocation();
  };

  getLocationPermissions = () => when(
    complement(isNil),
    () => this.props.changeLocationPermissions(true)
  )(navigator.geolocation);

  getCurrentLocation = () => navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
      this.props.changePosition(latitude, longitude));

  handleLatitudeChange = e => this.props.changePosition(parseFloat(e.target.value), this.props.position.get('long'));

  handleLongitudeChange = e => this.props.changePosition(this.props.position.get('lat'), parseFloat(e.target.value));

  handleMapClick = ({ lat, lng }) => pipe(
    prop('mode'),
    when(
      isPinMode,
      () => this.props.changePosition(lat, lng)
    )
  )(this.props);

  get coordinatesPanel() {
    return (<CoordinatesPanel
      position={this.props.position}
      handleLatitudeChange={this.handleLatitudeChange}
      handleLongitudeChange={this.handleLongitudeChange}
    />);
  }

  get locationPanel() {
    return <LocationPanel onButtonClick={this.getCurrentLocation} />;
  }

  get options() {
    return pipe(
      prop('mode'),
      cond([
        [isLocationMode, () => this.locationPanel],
        [isCoordinatesMode, () => this.coordinatesPanel],
      ])
    )(this.props);
  }

  get mapOptions() {
    return {
      scrollwheel: false,
      styles: mapStyles,
    };
  }

  render() {
    const { mode } = this.props;
    return (
      <div className="map__container">
        <div className="map__content">
          <div className="map__options">
            <Card>
              {this.options}
              <CardActions>
                <div className="options__buttons">
                  <FlatButton
                    label="Current location"
                    onClick={() => this.props.changeMode(LOCATION_MODE)}
                    disabled={or(isLocationMode(mode), equals(this.props.hasLocationPermissions, false))}
                  />
                  <FlatButton
                    label="Coordinates"
                    onClick={() => this.props.changeMode(COORDINATES_MODE)}
                    disabled={isCoordinatesMode(mode)}
                  />
                  <FlatButton
                    label="Move the marker"
                    onClick={() => this.props.changeMode(PIN_MODE)}
                    disabled={isPinMode(mode)}
                  />
                  <div className="options__button-wrapper">
                    <RaisedButton label="Show results" primary fullWidth={true} />
                  </div>
                </div>
              </CardActions>
            </Card>
          </div>
        </div>
        <GoogleMapReact
          onClick={this.handleMapClick}
          defaultZoom={this.props.zoom}
          center={{
            lat: this.props.position.get('lat'),
            lng: this.props.position.get('long'),
          }}
          options={this.mapOptions}
        >
          <PositionMarker
            lat={this.props.position.get('lat')}
            lng={this.props.position.get('long')}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
