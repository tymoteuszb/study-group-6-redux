import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';


export const { Types: IncidentTypes, Creators: IncidentActions } = createActions({
  getList: ['latitude', 'longitude'],
  getListSuccess: ['data'],
  getListFailure: ['error'],
}, { prefix: 'INCIDENT_' });

const IncidentRecord = new Record({
  list: null,
});

export const INITIAL_STATE = new IncidentRecord({});

const getListSuccessHandler = (state = INITIAL_STATE, { data: { incidents } }) => state.merge({ list: incidents });

export const reducer = createReducer(INITIAL_STATE, {
  [IncidentTypes.GET_LIST_SUCCESS]: getListSuccessHandler,
});
