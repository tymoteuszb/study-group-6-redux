import { call, put, takeLatest } from 'redux-saga/effects';
import envConfig from 'env-config';

import { IncidentActions, IncidentTypes } from './incident.redux';
import { get } from '../api/api.sagas';


export function* getListSaga({ latitude, longitude }) {
  try {
    const data = yield call(get, `/api/mapquest/incidents`, {
      outFormat: 'json',
      boundingBox: `${latitude - 0.3},${longitude - 0.3},${latitude + 0.3},${longitude + 0.3}`,
      key: envConfig.mapquest.apiKey,
    });

    yield put(IncidentActions.getListSuccess(data));
  } catch (e) {
    yield put(IncidentActions.getListFailure(e));
  }
}


export default function* countrySaga() {
  yield [
    yield takeLatest(IncidentTypes.GET_LIST, getListSaga),
  ];
}
