import { call, put, takeLatest, select } from 'redux-saga/effects';
import envConfig from 'env-config';

import { WeatherActions, WeatherTypes } from './weather.redux';
import { get } from '../api/api.sagas';


export function* getWeatherSaga({ latitude, longitude }) {
  try {
    const data = yield call(get, 'api/openweathermap/', {
      'lat': latitude,
      'lon': longitude,
      'appid': envConfig.openweathermap.apiKey,
    });

    yield put(WeatherActions.getWeatherSuccess(data));
  } catch (e) {
    yield put(WeatherActions.getWeatherFailure(e));
  }
}

export default function* weatherSaga() {
  yield [
    yield takeLatest(WeatherTypes.GET_WEATHER, getWeatherSaga),
  ];
}
