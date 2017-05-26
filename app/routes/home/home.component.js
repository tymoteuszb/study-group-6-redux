import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import FlickrPhotos from './components/flickrPhotos/flickrPhotos.container';


export class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <Helmet
          title="Homepage"
        />

        <div className="home__content">
          <div className="home__column home__column--half">
            <FlickrPhotos />
          </div>
        </div>
      </div>
    );
  }
}
