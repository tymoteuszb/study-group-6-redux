import React, { PureComponent, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import envConfig from 'env-config';


export class Entertainment extends PureComponent {
  static propTypes = {
    cinema: PropTypes.object.isRequired,
    park: PropTypes.object.isRequired,
  };

  openPhoto = (ref) => () => {
    window.open(`${envConfig.google.photoApiUrl}?key=${envConfig.google.apiKey}&photoreference=${ref}&maxwidth=1000`);
  };

  render() {
    return (
      <div className="entertainment">
        <List>
          <Subheader>Places for you</Subheader>
            {(this.props.cinema.size ? this.props.cinema : this.props.park).toArray().map((place) => (
              <ListItem
                key={place.get('id')}
                leftAvatar={<Avatar src={place.get('icon')} />}
                primaryText={place.get('name')}
                secondaryText={
                  <p>
                    {place.get('vicinity')}
                  </p>
                }
                secondaryTextLines={1}
                onClick={this.openPhoto(place.getIn(['photos', 0, 'photo_reference']))}
              />
            ))}
        </List>
      </div>
    );
  }
}
