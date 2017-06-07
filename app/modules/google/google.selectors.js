import { createSelector } from 'reselect';
import { List } from 'immutable';

const selectGoogleDomain = state => state.get('google');

export const selectPlaces = (count, type) => createSelector(
  selectGoogleDomain, state => state.getIn(['places', type], List())
    .sortBy(Math.random)
    .slice(0, count)
);
