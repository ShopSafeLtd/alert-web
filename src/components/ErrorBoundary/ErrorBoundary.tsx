import type { ErrorInfo, ReactNode } from 'react';

import React, { Component } from 'react';

import ErrorFallback from '../ErrorFallback';

interface Props {
  children: ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError?: () => void }>;
}

interface State {
  error?: Error;
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public resetError = () => {
    this.setState({ error: undefined, hasError: false });
  };

  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error, hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { error, hasError } = this.state;
    const { children, fallback: FallbackComponent = ErrorFallback } =
      this.props;

    if (hasError) {
      return <FallbackComponent error={error} resetError={this.resetError} />;
    }

    return children;
  }
}

export default ErrorBoundary;
