import Auth0Lock from 'auth0-lock';
import getVariableOrThrow from '../get-env-variable';

export class Auth {
  auth0: Auth0LockStatic;

  constructor() {
    this.auth0 = new Auth0Lock(
      getVariableOrThrow('REACT_APP_AUTH_CLIENT_ID'),
      getVariableOrThrow('REACT_APP_AUTH_DOMAIN'),
      {
        auth: {
          audience: `https://${getVariableOrThrow(
            'REACT_APP_AUTH_DOMAIN'
          )}/userinfo`,
          params: {
            scope: 'openid email',
          },
          redirectUrl: getVariableOrThrow('REACT_APP_AUTH_CALLBACK'),
          responseType: 'token id_token',
          sso: false,
        },
        container: 'root',
      }
    );
  }

  handleAuthentication = (hash: string) => {
    return new Promise((resolve, reject) => {
      this.auth0.resumeAuth(hash, (err: any, authResult: any) => {
        if (err) {
          return reject(err);
        }

        if (!authResult || !authResult.idToken) {
          return reject(err);
        }

        this.auth0.getUserInfo(authResult.accessToken, (infoErr, profile) => {
          if (infoErr) {
            return reject(infoErr);
          }

          this.setSession(authResult, profile);
          resolve();
        });
      });
    });
  }

  getIdToken = () => {
    const idToken = localStorage.getItem('idToken');

    if (idToken === null) {
      return null;
    }

    return idToken;
  }

  getAccessToken = () => {
    return localStorage.getItem('accessToken');
  }

  getProfile = () => {
    const profile = localStorage.getItem('profile');

    if (profile === null) {
      return null;
    }

    return JSON.parse(profile);
  }

  isAuthenticated = () => {
    const expiresAt = localStorage.getItem('expiresAt');

    if (expiresAt === null) {
      return false;
    }

    return new Date().getTime() < Number(expiresAt);
  }

  signIn = () => {
    this.auth0.show();
  }

  signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
    localStorage.removeItem('idToken');

    this.auth0.logout({
      returnTo: window.location.origin,
    });
  }

  setSession = (authResult: AuthResult, profile: any) => {
    const date = new Date();
    const expiresAt = date.setSeconds(date.getSeconds() + authResult.expiresIn);

    localStorage.setItem('expiresAt', String(expiresAt));
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('idToken', authResult.idToken);

    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }
}

const auth0Client = new Auth();

export default auth0Client;
