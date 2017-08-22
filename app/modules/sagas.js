import weatherSagas from './weather/weather.sagas';


export default function* rootSaga() {
  yield [
    weatherSagas(),
  ];
}
