import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import PlaceIcon from 'material-ui/svg-icons/maps/place';


export class Incidents extends PureComponent {
  static propTypes = {
    incidents: PropTypes.object.isRequired,
    getIncidents: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getIncidents(41.8339032, -87.8723913);
  }

  getFormattedDateRage = (incident) => {
    const startTime = moment(incident.get('startTime')).format('MM-DD-YYYY HH:mm');
    const endTime = moment(incident.get('endTime')).format('MM-DD-YYYY HH:mm');
    return `${startTime} - ${endTime}`;
  };

  render() {
    return (
      <div className="incidents">
        <Card>
          <CardHeader
            title="Incidents"
          />
          <List>
            {this.props.incidents.toArray().map((incident) => (
              <ListItem
                key={incident.get('id')}
                leftAvatar={<Avatar icon={<PlaceIcon />} />}
                rightIcon={incident.get('impacting') ? <ActionInfo /> : null}
                primaryText={incident.get('shortDesc')}
                secondaryText={this.getFormattedDateRage(incident)}
              />
            ))}
          </List>
        </Card>
      </div>
    );
  }
}
