import auth0, { Auth0DecodedHash, WebAuth } from 'auth0-js';
import getVariableOrThrow from './get-env-variable';

export class Auth {
  auth0: WebAuth;
  profile: any;
  idToken: string | undefined;
  expiresAt: number | null;

  constructor() {
    this.expiresAt = null;
    this.auth0 = new auth0.WebAuth({
      audience: `https://${getVariableOrThrow(
        'REACT_APP_AUTH_DOMAIN'
      )}/userinfo`,
      clientID: getVariableOrThrow('REACT_APP_AUTH_CLIENT_ID'),
      domain: getVariableOrThrow('REACT_APP_AUTH_DOMAIN'),
      redirectUri: getVariableOrThrow('REACT_APP_AUTH_CALLBACK'),
      responseType: 'id_token',
      scope: 'openid email',
    });
  }

  getProfile = () => {
    return this.profile;
  }

  getIdToken = () => {
    return this.idToken;
  }

  isAuthenticated = () => {
    if (this.expiresAt === null) {
      return false;
    }

    return new Date().getTime() < this.expiresAt;
  }

  signIn = () => {
    this.auth0.authorize();
  }

  signOut = () => {
    this.auth0.logout({
      clientID: getVariableOrThrow('REACT_APP_AUTH_CLIENT_ID'),
      returnTo: window.location.origin,
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return reject(err);
        }

        if (!authResult || !authResult.idToken) {
          return reject(err);
        }

        this.setSession(authResult);
        resolve();
      });
    });
  }

  silentAuth = () => {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          return reject(err);
        }

        this.setSession(authResult);
        resolve();
      });
    });
  }

  private setSession(authResult: Auth0DecodedHash) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }
}

const auth0Client = new Auth();

export default auth0Client;
