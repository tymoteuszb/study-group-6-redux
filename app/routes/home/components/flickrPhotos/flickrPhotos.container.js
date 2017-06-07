import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { FlickrPhotos } from './flickrPhotos.component';
import { FlickrActions } from '../../../../modules/flickr/flickr.redux';
import { selectFlickrPhotos } from '../../../../modules/flickr/flickr.selectors';


const PHOTOS_COUNT = 4;

const mapStateToProps = createStructuredSelector({
  photos: selectFlickrPhotos(PHOTOS_COUNT),
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPhotos: FlickrActions.getPhotos,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FlickrPhotos);
