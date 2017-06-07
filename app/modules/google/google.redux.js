import { createActions, createReducer } from 'reduxsauce';
import { Record, List } from 'immutable';


export const { Types: GoogleTypes, Creators: GoogleActions } = createActions({
  getPlaces: ['latitude', 'longitude', 'placeType', 'name'],
  getPlacesSuccess: ['data'],
  getPlacesFailure: ['error'],
}, { prefix: 'GOOGLE_' });

const GoogleRecord = new Record({
  places: List(),
});

export const INITIAL_STATE = new GoogleRecord({});

const getPlacesSuccessHandler = (state, { data: { results } }) => state.merge({ places: results });

export const reducer = createReducer(INITIAL_STATE, {
  [GoogleTypes.GET_PLACES_SUCCESS]: getPlacesSuccessHandler,
});
