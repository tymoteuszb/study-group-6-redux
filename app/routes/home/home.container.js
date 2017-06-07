import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { MapActions } from '../../modules/map/map.redux';
import { selectPosition, selectMode, selectLocationPermissions } from '../../modules/map/map.selectors';

import { Home } from './home.component';


const mapStateToProps = createStructuredSelector({
  position: selectPosition,
  mode: selectMode,
  hasLocationPermissions: selectLocationPermissions,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeLocationPermissions: MapActions.changeLocationPermissions,
  changePosition: MapActions.changePosition,
  changeMode: MapActions.changeMode,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
