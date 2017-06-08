import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Incidents } from './incidents.component';
import { selectIncidentList } from '../../../../modules/incident/incident.selectors';


const INCIDENTS_COUNT = 8;

const mapStateToProps = createStructuredSelector({
  incidents: selectIncidentList(INCIDENTS_COUNT),
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Incidents);
