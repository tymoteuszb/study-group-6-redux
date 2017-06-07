import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Places } from './places.component';
import { selectPlaces } from '../../../../modules/google/google.selectors';


const PLACES_COUNT = 8;

const mapStateToProps = createStructuredSelector({
  places: selectPlaces(PLACES_COUNT),
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Places);
