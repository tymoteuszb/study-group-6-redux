import { call, put, takeLatest } from 'redux-saga/effects';
import envConfig from 'env-config';

import { FlickrActions, FlickrTypes } from './flickr.redux';
import { get } from '../api/api.sagas';


export function* getPhotosSaga({ latitude, longitude }) {
  try {
    const data = yield call(get, 'api/flickr/', {
      'lat': latitude,
      'lon': longitude,
      'method': 'flickr.photos.search',
      'format': 'json',
      'nojsoncallback': 1,
      'api_key': envConfig.flickr.apiKey,
    });

    yield put(FlickrActions.getPhotosSuccess(data));
  } catch (e) {
    yield put(FlickrActions.getPhotosFailure(e));
  }
}


export default function* countrySaga() {
  yield [
    yield takeLatest(FlickrTypes.GET_PHOTOS, getPhotosSaga),
  ];
}
