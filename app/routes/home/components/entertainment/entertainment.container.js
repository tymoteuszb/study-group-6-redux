import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Entertainment } from './entertainment.component';
import { selectPlaces } from '../../../../modules/google/google.selectors';


const PLACES_COUNT = 4;

const mapStateToProps = createStructuredSelector({
  cinema: selectPlaces(PLACES_COUNT, 'movie_theater'),
  park: selectPlaces(PLACES_COUNT, 'park'),
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Entertainment);
