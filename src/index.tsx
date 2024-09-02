import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import '~/yet-another-react-lightbox/dist/styles.css';

import App from './App';
import './index.css';
import Auth0ProviderWithNavigate from './providers/Auth0Provider';
import * as serviceWorker from './serviceWorker';

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key');
// }

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
      {/* </ClerkProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
