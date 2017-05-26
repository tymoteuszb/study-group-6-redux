import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';


export class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <Helmet
          title="Homepage"
        />

        Home
      </div>
    );
  }
}
