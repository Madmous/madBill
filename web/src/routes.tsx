import React from 'react';
import { Route, Router } from 'react-router-dom';
import Form from './app/Form';
import Callback from './app/Callback/Callback';
import Auth from './auth/Auth';
import App from './app/App';

import history from './history';

const auth = new Auth();

const handleAuthentication = (prop: any) => {
  if (/access_token|id_token|error/.test(prop.location.hash)) {
    auth.handleAuthentication();
  }
};

export default () => (
  <Router history={history}>
    <div>
      <Route path="/invoice" render={props => <Form auth={auth} {...props} />} />
      <Route path="/" render={props => <App auth={auth} {...props} />} />
      <Route
        path="/callback"
        render={props => {
          handleAuthentication(props);
          return <Callback />;
        }}
      />
    </div>
  </Router>
);
