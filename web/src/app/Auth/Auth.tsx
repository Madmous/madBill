import auth0 from 'auth0-js';
import history from '../../history';

const throwIfUndefined = (key: string) => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`${key} is not configured`);
  }

  return value;
};

export default class Auth {
  accessToken: string | null;
  idToken: string | null;
  expiresAt: number;

  auth0 = new auth0.WebAuth({
    domain: throwIfUndefined('REACT_APP_AUTH_DOMAIN'),
    clientID: throwIfUndefined('REACT_APP_AUTH_CLIENT_ID'),
    redirectUri: throwIfUndefined('REACT_APP_AUTH_CALLBACK'),
    responseType: 'token id_token',
    scope: 'openid',
  });

  login() {
    this.auth0.authorize();
  }

  constructor() {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/invoice');
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult: any) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    history.replace('/invoice');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin,
    });

    // navigate to the home route
    history.replace('/invoice');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}
