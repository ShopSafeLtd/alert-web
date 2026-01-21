import { Progress, Spin, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Text, Title } = Typography;

interface FlowLoadingOverlayProps {
  darkTheme?: boolean;
  phase: 'connecting' | 'query' | 'syncing';
}

const FlowLoadingOverlay: React.FC<FlowLoadingOverlayProps> = ({
  darkTheme = false,
  phase,
}) => {
  const intl = useIntl();

  const getPhaseConfig = () => {
    switch (phase) {
      case 'query': {
        return {
          description: intl.formatMessage({
            defaultMessage: 'Fetching investigation flow...',
          }),
          percent: 33,
          title: intl.formatMessage({ defaultMessage: 'Loading Flow Data' }),
        };
      }
      case 'connecting': {
        return {
          description: intl.formatMessage({
            defaultMessage: 'Establishing collaboration connection...',
          }),
          percent: 66,
          title: intl.formatMessage({ defaultMessage: 'Connecting' }),
        };
      }
      case 'syncing': {
        return {
          description: intl.formatMessage({
            defaultMessage: 'Syncing flow data...',
          }),
          percent: 90,
          title: intl.formatMessage({ defaultMessage: 'Initializing' }),
        };
      }
      default: {
        return {
          description: intl.formatMessage({ defaultMessage: 'Please wait...' }),
          percent: 0,
          title: intl.formatMessage({ defaultMessage: 'Loading' }),
        };
      }
    }
  };

  const config = getPhaseConfig();

  return (
    <div
      style={{
        alignItems: 'center',
        backdropFilter: 'blur(8px)',
        backgroundColor: darkTheme
          ? 'rgba(0, 0, 0, 0.85)'
          : 'rgba(255, 255, 255, 0.85)',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '400px',
          padding: '32px',
        }}
      >
        <Spin size="large" />
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
          }}
        >
          <Title
            level={3}
            style={{
              color: darkTheme ? '#fff' : '#000',
              margin: 0,
            }}
          >
            {config.title}
          </Title>
          <Text
            style={{
              color: darkTheme
                ? 'rgba(255, 255, 255, 0.65)'
                : 'rgba(0, 0, 0, 0.65)',
              textAlign: 'center',
            }}
          >
            {config.description}
          </Text>
        </div>
        <Progress
          percent={config.percent}
          status="active"
          strokeColor={{
            from: '#108ee9',
            to: '#87d068',
          }}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default FlowLoadingOverlay;
