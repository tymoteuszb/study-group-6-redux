import { call, put, takeLatest, select } from 'redux-saga/effects';
import envConfig from 'env-config';

import { IncidentActions } from './incident.redux';
import { MapTypes } from '../map/map.redux';
import { selectPosition } from '../map/map.selectors';
import { get } from '../api/api.sagas';


export function* getListSaga() {
  try {
    const position = yield select(selectPosition);
    const lat = position.get('lat');
    const long = position.get('long');
    const data = yield call(get, '/api/mapquest/incidents', {
      outFormat: 'json',
      boundingBox: `${lat - 0.3},${long - 0.3},${lat + 0.3},${long + 0.3}`,
      key: envConfig.mapquest.apiKey,
    });

    yield put(IncidentActions.getListSuccess(data));
  } catch (e) {
    yield put(IncidentActions.getListFailure(e));
  }
}


export default function* countrySaga() {
  yield [
    yield takeLatest(MapTypes.CHANGE_POSITION, getListSaga),
  ];
}
