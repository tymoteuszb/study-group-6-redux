import flickrSagas from './flickr/flickr.sagas';
import weatherSagas from './weather/weather.sagas';

export default function* rootSaga() {
  yield [
    flickrSagas(),
    weatherSagas(),
  ];
}
