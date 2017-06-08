import React, { PureComponent, PropTypes } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';


export class FlickrPhotos extends PureComponent {
  static propTypes = {
    photos: PropTypes.object,
  };

  renderList() {
    if (!this.props.photos.size) {
      return <div className="flickr-photos__empty">No photos found</div>;
    }

    return (
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
    );
  }
  render() {
    return (
      <div className="flickr-photos">
        <Card>
          <CardHeader
            title="Nearby photos"
          />

          { !this.props.photos ?
              <div className="flickr-photos__loader"><CircularProgress size={80} thickness={5} /></div>
            :
              this.renderList()
          }
        </Card>
      </div>
    );
  }
}
