import { createSelector } from 'reselect';

const selectGoogleDomain = state => state.get('google');

export const selectPlaces = (count) => createSelector(
  selectGoogleDomain, state => state.get('places')
    .sortBy(Math.random)
    .slice(0, count)
);
