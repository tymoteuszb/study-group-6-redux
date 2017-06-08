import { call, put, takeLatest, select } from 'redux-saga/effects';
import envConfig from 'env-config';

import { FlickrActions } from './flickr.redux';
import { MapTypes } from '../map/map.redux';
import { selectPosition } from '../map/map.selectors';
import { get } from '../api/api.sagas';


export function* getPhotosSaga() {
  try {
    const position = yield select(selectPosition);
    const data = yield call(get, 'api/flickr/', {
      'lat': position.get('lat'),
      'lon': position.get('long'),
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
    yield takeLatest(MapTypes.CHANGE_POSITION, getPhotosSaga),
  ];
}
