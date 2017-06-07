import { createSelector } from 'reselect';
import { prop } from 'ramda';

const selectMapState = state => state.get('map');

export const selectPosition = createSelector(
  selectMapState,
  state => state.get('position'),
);

export const selectMode = createSelector(
  selectMapState,
  state => state.get('mode'),
);

export const selectLocationPermissions = createSelector(
  selectMapState,
  state => state.get('hasLocationPermissions'),
);
