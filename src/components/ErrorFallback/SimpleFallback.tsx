import { LocalStorageKeys } from '#/utils';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const handleReload = () => {
  window.location.reload();
};

const handleGoHome = () => {
  window.location.href = '/app';
};

const SimpleFallback: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem(LocalStorageKeys.theme);
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Fallback to system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

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

  const randomMessage =
    embarrassingMessages[
      Math.floor(Math.random() * embarrassingMessages.length)
    ];

  // Theme-aware colors
  const colors = {
    background: isDarkMode ? '#141414' : '#f5f5f5',
    button: {
      primary: {
        bg: '#1890ff',
        bgHover: '#40a9ff',
        text: '#fff',
      },
      secondary: {
        bg: isDarkMode ? '#262626' : '#fff',
        border: isDarkMode ? '#434343' : '#d9d9d9',
        borderHover: '#40a9ff',
        text: isDarkMode ? '#ffffff' : '#262626',
        textHover: '#40a9ff',
      },
    },
    text: {
      primary: isDarkMode ? '#ffffff' : '#262626',
      secondary: isDarkMode ? '#d9d9d9' : '#595959',
      tertiary: isDarkMode ? '#bfbfbf' : '#8c8c8c',
    },
  };

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        height: '100vh',
        justifyContent: 'center',
        padding: '20px',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div
        style={{
          animation: 'wobble 1s ease-in-out',
          fontSize: '120px',
          marginBottom: '24px',
        }}
      >
        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
        {'😳'}
      </div>

      <h1
        style={{
          color: colors.text.primary,
          fontSize: '32px',
          fontWeight: 600,
          marginBottom: '16px',
          textAlign: 'center',
          transition: 'color 0.3s ease',
        }}
      >
        {randomMessage}
      </h1>

      <div
        style={{
          marginBottom: '32px',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: colors.text.secondary,
            fontSize: '18px',
            marginBottom: '12px',
            transition: 'color 0.3s ease',
          }}
        >
          {intl.formatMessage({
            defaultMessage:
              "Something went wrong and we're not quite sure what. The good news is that our error tracking probably already knows about it!",
          })}
        </p>
        <p
          style={{
            color: colors.text.tertiary,
            fontSize: '16px',
            transition: 'color 0.3s ease',
          }}
        >
          {intl.formatMessage({
            defaultMessage:
              'You can try refreshing the page, or go back to the dashboard.',
          })}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handleReload}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.button.primary.bg;
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor =
              colors.button.primary.bgHover;
          }}
          style={{
            backgroundColor: colors.button.primary.bg,
            border: 'none',
            borderRadius: '6px',
            color: colors.button.primary.text,
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500,
            padding: '12px 24px',
            transition: 'all 0.3s',
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Try Again' })}
        </button>

        <button
          onClick={handleGoHome}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = colors.button.secondary.border;
            e.currentTarget.style.color = colors.button.secondary.text;
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor =
              colors.button.secondary.borderHover;
            e.currentTarget.style.color = colors.button.secondary.textHover;
          }}
          style={{
            backgroundColor: colors.button.secondary.bg,
            border: `1px solid ${colors.button.secondary.border}`,
            borderRadius: '6px',
            color: colors.button.secondary.text,
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500,
            padding: '12px 24px',
            transition: 'all 0.3s',
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Go to Dashboard' })}
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes wobble {
            0% { transform: rotate(0deg); }
            15% { transform: rotate(-15deg); }
            30% { transform: rotate(10deg); }
            45% { transform: rotate(-10deg); }
            60% { transform: rotate(5deg); }
            75% { transform: rotate(-2deg); }
            100% { transform: rotate(0deg); }
          }
        `,
        }}
      />
    </div>
  );
};

export default SimpleFallback;
