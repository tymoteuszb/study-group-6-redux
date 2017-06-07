import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Incidents } from './incidents.component';
import { IncidentActions } from '../../../../modules/incident/incident.redux';
import { selectIncidentList } from '../../../../modules/incident/incident.selectors';


const INCIDENTS_COUNT = 8;

const mapStateToProps = createStructuredSelector({
  incidents: selectIncidentList(INCIDENTS_COUNT),
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getIncidents: IncidentActions.getList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Incidents);
