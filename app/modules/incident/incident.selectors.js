import { createSelector } from 'reselect';

const selectIncidentDomain = state => state.get('incident');


export const selectIncidentList = (count) => createSelector(
  selectIncidentDomain, state => state.get('list')
    .sortBy((incident) => incident.get('distance'))
    .slice(0, count)
);
