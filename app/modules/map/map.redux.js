import { Record } from 'immutable';
import { createReducer, createActions } from 'reduxsauce';

export const PIN_MODE = 'pin';
export const COORDINATES_MODE = 'coordinates';
export const LOCATION_MODE = 'location';

export const { Types: MapTypes, Creators: MapActions } = createActions({
  changeMode: ['mode'],
  changeLocationPermissions: ['permitted'],
}, { prefix: 'MAP_' });

const MapRecord = new Record({
  mode: PIN_MODE,
  currentLocation: null,
  hasLocationPermissions: false,
});

export const INITIAL_STATE = new MapRecord({});

export const changeMode = (state = INITIAL_STATE, { mode }) => state
  .set('mode', mode);

export const changeLocationPermissions = (state = INITIAL_STATE, { permitted }) => state
  .set('hasLocationPermissions', permitted);

export const HANDLERS = {
  [MapTypes.CHANGE_MODE]: changeMode,
  [MapTypes.CHANGE_LOCATION_PERMISSIONS]: changeLocationPermissions,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
