import React, { PureComponent, PropTypes } from 'react';
import { CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

export class CoordinatesPanel extends PureComponent {
  static propTypes = {
    position: PropTypes.object.isRequired,
    handleLatitudeChange: PropTypes.func.isRequired,
    handleLongitudeChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <CardText>
        <div className="options__content">
          <div className="options__input-wrapper">
            <TextField
              floatingLabelText="Latitude"
              value={this.props.position.get('lat')}
              onChange={this.props.handleLatitudeChange}
              type="number"
            />
          </div>
          <div className="options__input-wrapper">
            <TextField
              floatingLabelText="Longitude"
              value={this.props.position.get('long')}
              onChange={this.props.handleLongitudeChange}
              type="number"
            />
          </div>
        </div>
      </CardText>
    );
  }
}
