import React from 'react';
import { useStoreState } from '../../state';
const OneSignal = window.OneSignal;

class NotificationContainer extends React.Component {
  componentDidMount() {
    if (OneSignal !== undefined) {
      if (OneSignal.isPushNotificationsEnabled !== undefined) {
        OneSignal.isPushNotificationsEnabled().then(isEnabled => {
          if (isEnabled && !!this.props.userId) {
            OneSignal.setExternalUserId(this.props.userId);
          }
        });
      }
    }

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    !!window.plugins &&
      !!window.plugins.OneSignal &&
      window.plugins.OneSignal.startInit('f8d1a7e3-f596-429a-a8f7-786d0d5dcde3')
        .handleNotificationOpened(notificationOpenedCallback)
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
        .endInit();

    if (!!this.props.userId && !!window.plugins && !!window.plugins.OneSignal) {
      window.plugins.OneSignal.setExternalUserId(this.props.userId);
    }
  }

  componentDidUpdate() {
    if (!!this.props.userId && !!window.plugins && !!window.plugins.OneSignal) {
      window.plugins.OneSignal.setExternalUserId(this.props.userId);
    }
  }

  render() {
    return this.props.children;
  }
}

const Wrapper = props => {
  const userId = useStoreState(state => state.user.id);

  return <NotificationContainer userId={userId} {...props} />;
};

export default Wrapper;
