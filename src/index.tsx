import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <Auth0Provider
    domain="auth.shopsafealert.co.uk"
    clientId="c2MqDavoao6lbVplyQTN8jq90m4PL6Io" // client id for portal in auth0
    redirectUri={window.location.origin}
    audience="https://app.shopsafealert.co.uk"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
