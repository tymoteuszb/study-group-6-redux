import { call, put, takeLatest } from 'redux-saga/effects';
import envConfig from 'env-config';

import { GoogleActions, GoogleTypes } from './google.redux';
import { get } from '../api/api.sagas';


export function* getPlacesSaga({ latitude, longitude, placeType, name }) {
  try {
    const data = yield call(get, 'api/places', {
      key: envConfig.google.apiKey,
      location: `${latitude},${longitude}`,
      radius: 10000,
      type: placeType,
      name,
    });

    yield put(GoogleActions.getPlacesSuccess(data));
  } catch (e) {
    yield put(GoogleActions.getPlacesFailure(e));
  }
}

export function* choosePlacesSaga() {
  if (Math.random() > 0.5) {
    yield put(GoogleActions.getPlaces(52.4004454, 16.7612416, 'movie_theater', 'kino'));
  } else {
    yield put(GoogleActions.getPlaces(52.4004454, 16.7612416, 'park', 'park'));
  }
}

export default function* googleSaga() {
  yield takeLatest('FLICKR_GET_PHOTOS', choosePlacesSaga); // get weather success action
  yield takeLatest(GoogleTypes.GET_PLACES, getPlacesSaga);
}
