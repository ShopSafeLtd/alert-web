import React, { PureComponent } from 'react';
import { Subscription } from 'react-apollo';

import AdminIncidentNotifications from '../../../graphql/incidents/subscriptions/AdminIncidentNotifications';
import UserIncidentNotifications from '../../../graphql/incidents/subscriptions/UserIncidentNotifications';

class AlertProvider extends PureComponent {
  render() {
    const { userId, refetch, admin, toggleNotificationBar } = this.props;

    let subscription;
    admin
      ? (subscription = UserIncidentNotifications)
      : (subscription = AdminIncidentNotifications);

    return (
      <Subscription
        subscription={subscription}
        variables={{
          schemeId: window.localStorage.getItem('currentScheme'),
          userId
        }}
        onSubscriptionData={({ subscriptionData }) => {
          if (!!subscriptionData.data) {
            if (userId !== subscriptionData.data.Alert.node.user.id) {
              toggleNotificationBar({
                status: true,
                text: 'New incidetns have been added.',
                bottom: false
              });
            }
          }
        }}
      >
        {() => {
          const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              refetch
            });
          });
          return children;
        }}
      </Subscription>
    );
  }
}

export default AlertProvider;
