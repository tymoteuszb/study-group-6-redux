import React, { PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const MARKER_COLOR = '#ff8f00';

export class PositionMarker extends PureComponent {
  render() {
    return (
      <div>
        <IconButton touch={true} tooltipPosition="top-center">
          <ActionGrade color={MARKER_COLOR} />
        </IconButton>
      </div>
    );
  }
}
