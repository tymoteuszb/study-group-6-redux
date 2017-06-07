import { Record, Map } from 'immutable';
import { createReducer, createActions } from 'reduxsauce';
import { PIN_MODE } from './map.constants';

export const { Types: MapTypes, Creators: MapActions } = createActions({
  changeMode: ['mode'],
  changePosition: ['lat', 'long'],
  changeLocationPermissions: ['permitted'],
}, { prefix: 'MAP_' });

const MapRecord = new Record({
  mode: PIN_MODE,
  position: Map({
    lat: 0,
    long: 0,
  }),
  hasLocationPermissions: false,
});

export const INITIAL_STATE = new MapRecord({});

export const changeMode = (state = INITIAL_STATE, { mode }) => state
  .set('mode', mode);

export const changePosition = (state = INITIAL_STATE, { lat, long }) => state
  .setIn(['position', 'lat'], lat)
  .setIn(['position', 'long'], long);

export const changeLocationPermissions = (state = INITIAL_STATE, { permitted }) => state
  .set('hasLocationPermissions', permitted);

export const HANDLERS = {
  [MapTypes.CHANGE_MODE]: changeMode,
  [MapTypes.CHANGE_LOCATION_PERMISSIONS]: changeLocationPermissions,
  [MapTypes.CHANGE_POSITION]: changePosition,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
