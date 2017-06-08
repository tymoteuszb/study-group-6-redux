import React, { PureComponent, PropTypes} from 'react';
import { CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export class LocationPanel extends PureComponent {
  static propTypes = {
    onButtonClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <CardActions>
        <div className="options__button-wrapper">
          <RaisedButton
            secondary
            label="Get location"
            onClick={this.props.onButtonClick}
          />
        </div>
      </CardActions>
    );
  }
}