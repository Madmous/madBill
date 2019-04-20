import auth0, { WebAuth, Auth0DecodedHash } from 'auth0-js';
import history from '../history';
import getVariableOrThrow from '../get-env-variable';

export default class Auth {
  accessToken: string | null;
  idToken: string | null;
  expiresAt: number;
  auth0: WebAuth;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: getVariableOrThrow('REACT_APP_AUTH_DOMAIN'),
      clientID: getVariableOrThrow('REACT_APP_AUTH_CLIENT_ID'),
      redirectUri: getVariableOrThrow('REACT_APP_AUTH_CALLBACK'),
      responseType: 'token id_token',
      scope: 'openid',
    });
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/invoice');
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  getAccessToken = () => {
    return this.accessToken;
  };

  getIdToken = () => {
    return this.idToken;
  };

  setSession(authResult: Auth0DecodedHash) {
    localStorage.setItem('isLoggedIn', 'true');

    if (!authResult.expiresIn) {
      return;
    }

    if (!authResult.accessToken) {
      return;
    }

    if (!authResult.idToken) {
      return;
    }

    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    history.replace('/invoice');
  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        return;
      }

      if (err) {
        this.logout();
        console.error(err);
      }
    });
  };

  logout = () => {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin,
    });
  };

  isAuthenticated = () => {
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  };
}
