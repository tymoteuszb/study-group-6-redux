import { combineReducers } from 'redux-immutable';

import { reducer as route } from './router/router.redux';
import { reducer as locales } from './locales/locales.redux';
import { reducer as map } from './map/map.redux';
import { reducer as flickr } from './flickr/flickr.redux';
import { reducer as weather } from './weather/weather.redux';
import { reducer as google } from './google/google.redux';


export default function createReducer() {
  return combineReducers({
    route,
    locales,
    map,
    flickr,
    weather,
    google,
  });
}
