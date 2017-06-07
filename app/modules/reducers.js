import { combineReducers } from 'redux-immutable';

import { reducer as routerReducer } from './router/router.redux';
import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as flickrReducer } from './flickr/flickr.redux';
import { reducer as weatherReducer } from './weather/weather.redux';


export default function createReducer() {
  return combineReducers({
    route: routerReducer,
    locales: localesReducer,
    flickr: flickrReducer,
    weather: weatherReducer,
  });
}
