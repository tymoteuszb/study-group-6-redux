import React, { PropTypes, PureComponent } from 'react';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { get } from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, green700, amber800 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

import { appLocales, translationMessages } from '../i18n';
import { DEFAULT_LOCALE } from '../modules/locales/locales.redux';


export class App extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    router: PropTypes.object.isRequired,
    setLanguage: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  componentWillMount() {
    const language = get(this.props.router, 'params.lang', DEFAULT_LOCALE);

    if (appLocales.indexOf(language) === -1) {
      this.props.setLanguage(DEFAULT_LOCALE);
      this.props.router.push('/404');
    } else {
      this.props.setLanguage(language);
    }
  }

  get muiTheme() {
    return getMuiTheme({
      palette: {
        primary1Color: green500,
        primary2Color: green700,
        accent1Color: amber800,
        pickerHeaderColor: green500,
      },
    });
  }

  render() {
    if (!this.props.language) {
      return null;
    }

    return (
      <div className="app">
        <Helmet
          titleTemplate="%s - React-Redux Exercise"
          defaultTitle="React-Redux Exercise"
        />

        <IntlProvider
          locale={this.props.language}
          messages={translationMessages[this.props.language]}
        >
          <MuiThemeProvider muiTheme={this.muiTheme}>
            <div className="app__content">
              <AppBar
                title="React-Redux Exercise"
                showMenuIconButton={false}
              />

              {React.Children.only(this.props.children)}
            </div>
          </MuiThemeProvider>
        </IntlProvider>
      </div>
    );
  }
}
