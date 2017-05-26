import React, { PureComponent, PropTypes } from 'react';
import {Card, CardHeader } from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';


export class FlickrPhotos extends PureComponent {
  static propTypes = {
    photos: PropTypes.object.isRequired,
    getPhotos: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getPhotos(52.4004454, 16.7612416);
  }

  render() {
    return (
      <div className="flickr-photos">
        <Card>
          <CardHeader
            title="Nearby photos"
          />
          <GridList
            cellHeight={240}
            cols={2}
          >
            {this.props.photos.toArray().map((photo) => (
              <GridTile
                key={photo.get('id')}
                title={photo.get('title')}
              >
                <img src={photo.get('url')} />
              </GridTile>
            ))}
          </GridList>
        </Card>
      </div>
    );
  }
}
