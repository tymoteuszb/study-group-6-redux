import { createSelector } from 'reselect';
import { List } from 'immutable';
import kelvinToCelsius from 'kelvin-to-celsius';
import { weatherIconMaker } from './weather.icon.helper';

const selectWeatherDomain = state => state.get('weather');

export const selectWeather = () => createSelector(
  selectWeatherDomain, state => {
    const temp = parseInt(kelvinToCelsius(parseInt(state.getIn(['weather', 'main', 'temp']), 10)), 10);
    const pressure = state.getIn(['weather', 'main', 'pressure']);
    const humidity = state.getIn(['weather', 'main', 'humidity']);
    const code = state.getIn(['weather', 'cod']);
    const localization = state.getIn(['weather', 'name']);
    const clouds = state.getIn(['weather', 'clouds', 'all']);
    return state.getIn(['weather', 'weather'], List())
      .map((weather) => {
        const iconUrl = `http://openweathermap.org/img/w/${weather.get('icon')}.png`;
        const modernIcon = weatherIconMaker(code);
        const description = `${weather.get('main')}`;

        return weather.merge({
          description: `${description}`,
          icon: `${iconUrl}`,
          temp: `${temp} ℃`,
          pressure: `${pressure} hPa`,
          humidity: `${humidity}`,
          code: `${code}`,
          modernIcon: `${modernIcon}`,
          localization: `${localization}`,
          clouds: `${clouds}`,
        });
      });
  }
);
