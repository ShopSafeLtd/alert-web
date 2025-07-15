import {
  faFaceFlushed,
  faHome,
  faRefresh,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Result } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useStoreState } from 'state';

const useStyles = createUseStyles({
  '@keyframes wobble': {
    '0%': { transform: 'rotate(0deg)' },
    '15%': { transform: 'rotate(-15deg)' },
    '30%': { transform: 'rotate(10deg)' },
    '45%': { transform: 'rotate(-10deg)' },
    '60%': { transform: 'rotate(5deg)' },
    '75%': { transform: 'rotate(-2deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    padding: 20,
  },
  errorDetails: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    fontFamily: 'monospace',
    fontSize: 12,
    marginTop: 16,
    maxWidth: 600,
    padding: 16,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  icon: {
    animation: '$wobble 1s ease-in-out',
    color: '#ff4d4f',
    fontSize: 120,
    marginBottom: 24,
  },
  subtitle: {
    '& p': {
      margin: '8px 0',
    },
    maxWidth: 600,
  },
});

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

const handleGoHome = () => {
  window.location.href = '/app';
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  const classes = useStyles();
  const intl = useIntl();
  const isDark = useStoreState((state) => state.theme.currentTheme) === 'dark';
  const [showDetails, setShowDetails] = React.useState(false);

  // Random embarrassing messages
  const embarrassingMessages = [
    intl.formatMessage({ defaultMessage: 'Well, this is embarrassing...' }),
    intl.formatMessage({
      defaultMessage: 'Oops! We tripped over our own code.',
    }),
    intl.formatMessage({ defaultMessage: 'Houston, we have a problem...' }),
    intl.formatMessage({ defaultMessage: 'Did we forget to carry the one?' }),
    intl.formatMessage({
      defaultMessage: 'Our hamsters stopped running the servers.',
    }),
    intl.formatMessage({ defaultMessage: '404: Our dignity not found.' }),
  ];

  const [randomMessage] = React.useState(
    embarrassingMessages[
      Math.floor(Math.random() * embarrassingMessages.length)
    ]
  );

  const handleReload = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={classes.container}>
      <FontAwesomeIcon className={classes.icon} icon={faFaceFlushed} />

      <Result
        extra={[
          <Button
            icon={
              <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 8 }} />
            }
            key="reload"
            onClick={handleReload}
            type="primary"
          >
            {intl.formatMessage({ defaultMessage: 'Try Again' })}
          </Button>,
          <Button
            icon={<FontAwesomeIcon icon={faHome} style={{ marginRight: 8 }} />}
            key="home"
            onClick={handleGoHome}
          >
            {intl.formatMessage({ defaultMessage: 'Go to Dashboard' })}
          </Button>,
          error && (
            <Button
              key="details"
              onClick={() => setShowDetails(!showDetails)}
              type="link"
            >
              {showDetails
                ? intl.formatMessage({ defaultMessage: 'Hide Details' })
                : intl.formatMessage({ defaultMessage: 'Show Details' })}
            </Button>
          ),
        ].filter(Boolean)}
        status="error"
        subTitle={
          <div className={classes.subtitle}>
            <p>
              {intl.formatMessage({
                defaultMessage:
                  "Something went wrong and we're not quite sure what. The good news is that our error tracking probably already knows about it!",
              })}
            </p>
            <p style={{ marginTop: 12 }}>
              {intl.formatMessage({
                defaultMessage:
                  "You can try refreshing the page, or if you're feeling adventurous, you can check out the error details below.",
              })}
            </p>
          </div>
        }
        title={randomMessage}
      />

      {showDetails && error && (
        <div
          className={classes.errorDetails}
          style={{
            backgroundColor: isDark
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.05)',
            color: isDark ? '#fff' : '#000',
          }}
        >
          <strong>
            {error.name}
            {intl.formatMessage({ defaultMessage: ':' })}
          </strong>{' '}
          {error.message}
          {error.stack && (
            <>
              <br />
              <br />
              <strong>
                {intl.formatMessage({ defaultMessage: 'Stack trace:' })}
              </strong>
              <br />
              {error.stack}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorFallback;
