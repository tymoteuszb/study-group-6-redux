import flickrSagas from './flickr/flickr.sagas';


export default function* rootSaga() {
  yield [
    flickrSagas(),
  ];
}
