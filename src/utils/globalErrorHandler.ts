// Global error handler for uncaught errors
const initializeGlobalErrorHandler = () => {
  // Handle uncaught errors
  window.addEventListener('error', (event: ErrorEvent) => {
    console.error('Global error caught:', event.error);

    // Check if we should show the error page
    if (!document.getElementById('global-error-fallback')) {
      showGlobalErrorFallback(event.error as Error);
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);

      // Check if we should show the error page
      if (!document.getElementById('global-error-fallback')) {
        const errorMessage =
          event.reason instanceof Error
            ? event.reason.message
            : String(event.reason);
        showGlobalErrorFallback(new Error(errorMessage));
      }
    }
  );
};

const showGlobalErrorFallback = (error: Error) => {
  const embarrassingMessages = [
    'Well, this is embarrassing...',
    'Oops! We tripped over our own code.',
    'Houston, we have a problem...',
    'Did we forget to carry the one?',
    'Our hamsters stopped running the servers.',
    '404: Our dignity not found.',
    'We accidentally divided by zero.',
    'The code gremlins got us.',
    'Someone forgot to feed the server hamsters.',
    'We blue-screened... in JavaScript!',
  ];

  const randomMessage =
    embarrassingMessages[
      Math.floor(Math.random() * embarrassingMessages.length)
    ];

  // Check for dark mode preference
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme
    ? savedTheme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Theme-aware colors
  const colors = {
    background: isDarkMode ? '#141414' : '#f5f5f5',
    button: {
      secondary: {
        bg: isDarkMode ? '#262626' : '#fff',
        border: isDarkMode ? '#434343' : '#d9d9d9',
        text: isDarkMode ? '#ffffff' : '#262626',
      },
    },
    details: {
      bg: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      text: isDarkMode ? '#ffffff' : '#262626',
    },
    text: {
      primary: isDarkMode ? '#ffffff' : '#262626',
      secondary: isDarkMode ? '#d9d9d9' : '#595959',
      tertiary: isDarkMode ? '#bfbfbf' : '#8c8c8c',
    },
  };

  // Create error UI
  const errorHtml = `
    <div id="global-error-fallback" style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: ${colors.background};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 999999;
      padding: 20px;
    ">
      <style>
        @keyframes wobble {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          45% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          75% { transform: rotate(-2deg); }
          100% { transform: rotate(0deg); }
        }
        
        .error-icon {
          font-size: 120px;
          margin-bottom: 24px;
          animation: wobble 1s ease-in-out;
        }
        
        .error-button {
          padding: 12px 24px;
          margin: 0 8px;
          font-size: 16px;
          font-weight: 500;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .error-button-primary {
          color: #fff;
          background-color: #1890ff;
        }
        
        .error-button-primary:hover {
          background-color: #40a9ff;
        }
        
        .error-button-secondary {
          color: ${colors.button.secondary.text};
          background-color: ${colors.button.secondary.bg};
          border: 1px solid ${colors.button.secondary.border};
        }
        
        .error-button-secondary:hover {
          border-color: #40a9ff;
          color: #40a9ff;
        }
      </style>
      
      <div class="error-icon">😳</div>
      
      <h1 style="
        font-size: 32px;
        font-weight: 600;
        margin: 0 0 16px 0;
        color: ${colors.text.primary};
        text-align: center;
      ">${randomMessage}</h1>
      
      <div style="
        max-width: 600px;
        text-align: center;
        margin-bottom: 32px;
      ">
        <p style="
          font-size: 18px;
          color: ${colors.text.secondary};
          margin: 0 0 12px 0;
        ">
          Something went wrong and we're not quite sure what. The good news is that our error tracking probably already knows about it!
        </p>
        <p style="
          font-size: 16px;
          color: ${colors.text.tertiary};
          margin: 0;
        ">
          You can try refreshing the page, or go back to the dashboard.
        </p>
      </div>
      
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;">
        <button onclick="window.location.reload()" class="error-button error-button-primary">
          Try Again
        </button>
        <button onclick="window.location.href='/app'" class="error-button error-button-secondary">
          Go to Dashboard
        </button>
      </div>
      
      ${
        process.env.NODE_ENV === 'development'
          ? `
        <details style="
          margin-top: 32px;
          max-width: 800px;
          width: 100%;
          background: ${colors.details.bg};
          padding: 16px;
          border-radius: 8px;
          color: ${colors.details.text};
        ">
          <summary style="cursor: pointer; font-weight: 600;">Error Details</summary>
          <pre style="
            margin-top: 8px;
            white-space: pre-wrap;
            word-break: break-word;
            font-size: 12px;
            color: ${colors.details.text};
          ">${error.stack || error.toString()}</pre>
        </details>
      `
          : ''
      }
    </div>
  `;

  // Clear existing content and add error UI
  document.body.innerHTML = '';
  const container = document.createElement('div');
  container.innerHTML = errorHtml;
  document.body.append(container.firstElementChild as HTMLElement);
};

export { initializeGlobalErrorHandler, showGlobalErrorFallback };
