import { createSelector } from 'reselect';

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
