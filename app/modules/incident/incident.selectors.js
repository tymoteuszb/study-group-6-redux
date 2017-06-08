import { createSelector } from 'reselect';

const selectIncidentDomain = state => state.get('incident');


export const selectIncidentList = (count) => createSelector(
  selectIncidentDomain, state => {
    const list = state.get('list');
    if (!list) {
      return null;
    }

    return list
      .sortBy((incident) => incident.get('distance'))
      .slice(0, count);
  }
);
