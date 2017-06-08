import { call, put, takeLatest, select } from 'redux-saga/effects';
import envConfig from 'env-config';

import { WeatherActions } from './weather.redux';
import { MapTypes } from '../map/map.redux';
import { selectPosition } from '../map/map.selectors';
import { get } from '../api/api.sagas';


export function* getWeatherSaga() {
  try {
    const position = yield select(selectPosition);
    const data = yield call(get, 'api/openweathermap/', {
      'lat': position.get('lat'),
      'lon': position.get('long'),
      'appid': envConfig.openweathermap.apiKey,
    });

    yield put(WeatherActions.getWeatherSuccess(data));
  } catch (e) {
    yield put(WeatherActions.getWeatherFailure(e));
  }
}

export default function* weatherSaga() {
  yield [
    yield takeLatest(MapTypes.CHANGE_POSITION, getWeatherSaga),
  ];
}
