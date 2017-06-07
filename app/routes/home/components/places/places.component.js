import React, { PureComponent, PropTypes } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';


export class Places extends PureComponent {
  static propTypes = {
    places: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="cinemas-and-parks">
        <Card>
          <CardHeader
            title="Place to go"
          />
          <GridList
            cellHeight={120}
            cols={4}
          >
          {this.props.places.toArray().map((place) => (
            <GridTile
              key={place.get('id')}
              title={place.get('name')}
            >
              <img src={place.get('icon')} />
            </GridTile>
          ))}
          </GridList>
        </Card>
      </div>
    );
  }
}
