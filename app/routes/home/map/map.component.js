import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';

import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions } from 'material-ui/Card';

export class Map extends PureComponent {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  componentDidMount() {
   this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((x) => {
        console.log(x);
      });
    }
  }

  render() {
    return (
      <div className="map__container">
        <div className="map__content">
          <div className="map__options">
            <Card>
              <CardActions>
                <FlatButton label="Current loaction" disabled={true} />
                <FlatButton label="Address" />
                <FlatButton label="Mark the pin" />
              </CardActions>
            </Card>
          </div>
        </div>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
