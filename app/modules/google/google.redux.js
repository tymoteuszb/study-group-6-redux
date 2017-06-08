import { createActions, createReducer } from 'reduxsauce';
import { Record, List } from 'immutable';


export const { Types: GoogleTypes, Creators: GoogleActions } = createActions({
  choosePlaces: [],
  getPlaces: ['latitude', 'longitude', 'placeType', 'name'],
  getPlacesSuccess: ['data', 'placeType'],
  getPlacesFailure: ['error'],
}, { prefix: 'GOOGLE_' });

const GoogleRecord = new Record({
  places: {
    movie_theater: List(), // eslint-disable-line camelcase
    park: List(),
  },
});

export const INITIAL_STATE = new GoogleRecord({});

const getPlacesSuccessHandler = (state, { data: { results }, placeType }) =>
  state.merge({ places: { [placeType]: results } });

export const reducer = createReducer(INITIAL_STATE, {
  [GoogleTypes.GET_PLACES_SUCCESS]: getPlacesSuccessHandler,
});
