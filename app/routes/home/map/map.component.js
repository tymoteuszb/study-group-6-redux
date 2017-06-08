import React, { PureComponent, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { when, isNil, complement, equals, cond, pipe, or, prop } from 'ramda';

import { PIN_MODE, COORDINATES_MODE, LOCATION_MODE } from '../../../modules/map/map.constants';
import { mapStyles } from './map.styles';

const getCoordinatesText = (lat, long) => `${lat}, ${long}`;
const isLocationMode = equals(LOCATION_MODE);
const isCoordinatesMode = equals(COORDINATES_MODE);
const isPinMode = equals(PIN_MODE);
const MARKER_COLOR = '#ff8f00';

const PositionMarker = ({lat, lng}) => <div>
  <IconButton
    tooltip={getCoordinatesText(lat, lng)}
    touch={true}
    tooltipPosition="top-center"
  >
    <ActionGrade color={MARKER_COLOR}  />
  </IconButton>
</div>;

export class Map extends PureComponent {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
    hasLocationPermissions: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    zoom: 12,
    hasLocationPermissions: false,
  };

  componentDidMount = () => this.getLocationPermissions();

  componentWillUpdate = (nextProps) => pipe(
    prop('mode'),
    when(isLocationMode, () => this.getCurrentLocation()),
  )(this.props);

  getLocationPermissions = () => when(
    complement(isNil),
    () => this.props.changeLocationPermissions(true)
  )(navigator.geolocation);

  getCurrentLocation = () => navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
      this.props.changePosition(latitude, longitude));

  changeMode = (mode) => this.props.changeMode(mode);

  handleLatitudeChange = (e) => this.props.changePosition(parseFloat(e.target.value), this.props.position.get('long'));

  handleLongitudeChange = (e) => this.props.changePosition(this.props.position.get('lat'), parseFloat(e.target.value));

  handleMapClick = ({lat, lng}) => pipe(
    prop('mode'),
    when(
      isPinMode,
      () => this.props.changePosition(lat, lng)
    )
  )(this.props);

  get coordinatesPanel() {
    return <CardText>
      <div className="options__content">
        <div className="options__input-wrapper">
          <TextField
            floatingLabelText="Latitude"
            value={this.props.position.get('lat')}
            onChange={this.handleLatitudeChange}
            type="number"
          />
        </div>
        <div className="options__input-wrapper">
          <TextField
            floatingLabelText="Longitude"
            value={this.props.position.get('long')}
            onChange={this.handleLongitudeChange}
            type="number"
          />
        </div>
      </div>
    </CardText>;
  }

  get locationPanel() {
    return <CardActions>
      <div className="options__button-wrapper">
        <RaisedButton
          secondary
          label="Refresh"
          onClick={this.getCurrentLocation}
        />
      </div>
    </CardActions>;
  };

  get options() {
    return pipe(
      prop('mode'),
      cond([
        [isLocationMode, () => this.locationPanel],
        [isCoordinatesMode, () => this.coordinatesPanel],
      ])
    )(this.props);
  };

  get mapOptions() {
    return {
      scrollwheel: false,
      styles: mapStyles,
    }
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
                <FlatButton
                  label="Current location"
                  onClick={() => this.changeMode(LOCATION_MODE)}
                  disabled={or(isLocationMode(mode), equals(this.props.hasLocationPermissions, false))}
                />
                <FlatButton
                  label="Coordinates"
                  onClick={() => this.changeMode(COORDINATES_MODE)}
                  disabled={isCoordinatesMode(mode)}
                />
                <FlatButton
                  label="Move the marker"
                  onClick={() => this.changeMode(PIN_MODE)}
                  disabled={isPinMode(mode)}
                />
                <div className="options__button-wrapper">
                  <RaisedButton label="Show results" primary fullWidth={true} />
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
            lng: this.props.position.get('long')
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
