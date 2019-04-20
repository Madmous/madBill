import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './app/App';
import Callback from './app/Callback/Callback';
import Form from './app/Form';
import Auth from './auth';

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
      <Route path='/invoice' render={props => <Form auth={auth} />} />
      <Route path='/' render={props => <App auth={auth} {...props} />} />
      <Route
        path='/callback'
        render={props => {
          handleAuthentication(props);
          return <Callback />;
        }}
      />
    </div>
  </Router>
);
