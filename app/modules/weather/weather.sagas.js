import { call, put, takeLatest } from 'redux-saga/effects';
import envConfig from 'env-config';

import { WeatherActions, WeatherTypes } from './weather.redux';
import { get } from '../api/api.sagas';


export function* getWeatherSaga() {
  try {
    const data = yield call(get, 'api/openweathermap/', {
      'lat': 52.414265,
      'lon': 16.9179619,
      'appid': envConfig.openweathermap.apiKey,
    });

    yield put(WeatherActions.getWeatherSuccess(data));
  } catch (e) {
    yield put(WeatherActions.getWeatherFailure(e));
  }
}

export default function* weatherSaga() {
  yield takeLatest(WeatherTypes.GET_WEATHER, getWeatherSaga);
}
