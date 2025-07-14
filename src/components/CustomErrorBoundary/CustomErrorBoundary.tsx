import React from 'react';

import ErrorFallback from '../ErrorFallback/ErrorFallback';
import SimpleFallback from '../ErrorFallback/SimpleFallback';

interface Props {
  children: React.ReactNode;
  useSimpleFallback?: boolean;
}

interface State {
  error?: Error;
  hasError: boolean;
}

class CustomErrorBoundary extends React.Component<Props, State> {
  resetError = () => {
    this.setState({ error: undefined, hasError: false });
  };

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console for development
    console.error('Error caught by boundary:', error, errorInfo);

    // Report to Sentry if available
    if (
      typeof window !== 'undefined' &&
      (
        window as {
          Sentry?: {
            captureException: (error: Error, context: object) => void;
          };
        }
      ).Sentry
    ) {
      const windowWithSentry = window as {
        Sentry: { captureException: (error: Error, context: object) => void };
      };
      windowWithSentry.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }
  }

  render() {
    const { error, hasError } = this.state;
    const { children, useSimpleFallback } = this.props;

    if (hasError) {
      // Use simple fallback for top-level errors, enhanced fallback for component-level errors
      if (useSimpleFallback) {
        return <SimpleFallback />;
      }

      return <ErrorFallback error={error} resetError={this.resetError} />;
    }

    return children;
  }
}

export default CustomErrorBoundary;
