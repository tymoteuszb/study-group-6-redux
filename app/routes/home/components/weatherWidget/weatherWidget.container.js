import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { WeatherWidget } from './weatherWidget.component';
import { WeatherActions } from '../../../../modules/weather/weather.redux';
import { selectWeather } from '../../../../modules/weather/weather.selectors';


const mapStateToProps = createStructuredSelector({
  weather: selectWeather,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getWeather: WeatherActions.getWeather,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWidget);
