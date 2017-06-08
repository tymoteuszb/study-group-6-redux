import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';


export const { Types: FlickrTypes, Creators: FlickrActions } = createActions({
  getPhotos: ['latitude', 'longitude'],
  getPhotosSuccess: ['data'],
  getPhotosFailure: ['error'],
}, { prefix: 'FLICKR_' });

const FlickrRecord = new Record({
  photos: null,
});

export const INITIAL_STATE = new FlickrRecord({});

const getPhotosSuccessHandler = (state = INITIAL_STATE, { data: { photos } }) => state.merge({ photos });

export const reducer = createReducer(INITIAL_STATE, {
  [FlickrTypes.GET_PHOTOS_SUCCESS]: getPhotosSuccessHandler,
});
