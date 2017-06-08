import flickrSagas from './flickr/flickr.sagas';
import incidentSagas from './incident/incident.sagas';
import weatherSagas from './weather/weather.sagas';
import googleSagas from './google/google.sagas';


export default function* rootSaga() {
  yield [
    flickrSagas(),
    incidentSagas(),
    weatherSagas(),
    googleSagas(),
  ];
}
