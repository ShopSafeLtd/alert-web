import type { ApolloError } from '@apollo/client';

import { Alert, Button, Result } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface FlowErrorStateProps {
  errorType: 'query' | 'websocket';
  loadingError?: { error?: Error; message: string; type: string } | null;
  onRetry: () => void;
  queryError?: ApolloError;
}

const FlowErrorState: React.FC<FlowErrorStateProps> = ({
  errorType,
  loadingError,
  onRetry,
  queryError,
}) => {
  const intl = useIntl();

  const getErrorConfig = () =>
    errorType === 'query'
      ? {
          errorMessage:
            queryError?.message ||
            intl.formatMessage({ defaultMessage: 'Unknown error' }),
          subTitle: intl.formatMessage({
            defaultMessage:
              'An error occurred while loading the investigation flow. Please try again.',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Failed to Load Flow Data',
          }),
        }
      : {
          errorMessage:
            loadingError?.message ||
            intl.formatMessage({
              defaultMessage: 'WebSocket connection failed',
            }),
          subTitle: intl.formatMessage({
            defaultMessage:
              'Unable to connect to collaboration server. You can still view the flow in read-only mode.',
          }),
          title: intl.formatMessage({ defaultMessage: 'Connection Failed' }),
        };

  const config = getErrorConfig();

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      <Result
        extra={[
          <Button key="retry" onClick={onRetry} type="primary">
            {intl.formatMessage({ defaultMessage: 'Retry' })}
          </Button>,
        ]}
        status="error"
        subTitle={config.subTitle}
        title={config.title}
      >
        <div style={{ margin: '0 auto', maxWidth: '600px' }}>
          <Alert
            description={config.errorMessage}
            message={intl.formatMessage({
              defaultMessage: 'Technical Details',
            })}
            showIcon
            type="error"
          />
        </div>
      </Result>
    </div>
  );
};

export default FlowErrorState;
