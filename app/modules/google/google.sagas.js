import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import envConfig from 'env-config';

import { GoogleActions, GoogleTypes } from './google.redux';
import { selectPosition } from '../map/map.selectors';
import { selectClouds } from '../weather/weather.selectors';
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

    yield put(GoogleActions.getPlacesSuccess(data, placeType));
  } catch (e) {
    yield put(GoogleActions.getPlacesFailure(e));
  }
}

export function* choosePlacesSaga() {
  const { lat, long } = (yield select(selectPosition)).toJS();
  const isCloudy = yield select(selectClouds);

  if (isCloudy) {
    yield put(GoogleActions.getPlaces(lat, long, 'movie_theater'));
  } else {
    yield put(GoogleActions.getPlaces(lat, long, 'park', 'park'));
  }
}

export default function* googleSaga() {
  yield takeLatest(GoogleTypes.CHOOSE_PLACES, choosePlacesSaga);
  yield takeEvery(GoogleTypes.GET_PLACES, getPlacesSaga);
}
