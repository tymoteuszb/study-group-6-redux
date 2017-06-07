import { combineReducers } from 'redux-immutable';

import { reducer as routerReducer } from './router/router.redux';
import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as flickrReducer } from './flickr/flickr.redux';
import { reducer as incidentReducer } from './incident/incident.redux';
import { reducer as mapReducer } from './map/map.redux';
import { reducer as weatherReducer } from './weather/weather.redux';
import { reducer as googleReducer } from './google/google.redux';


export default function createReducer() {
  return combineReducers({
    route: routerReducer,
    locales: localesReducer,
    flickr: flickrReducer,
    incident: incidentReducer,
    map: mapReducer,
    weather: weatherReducer,
    google: googleReducer,
  });
}
