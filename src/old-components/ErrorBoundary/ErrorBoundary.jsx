import React from 'react';
import * as Sentry from '@sentry/react';

import Error from '../global/Error/Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      eventId: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    const { error, eventId } = this.state;
    const { children } = this.props;

    return error ? <Error eventId={eventId} /> : children;
  }
}

export default ErrorBoundary;
