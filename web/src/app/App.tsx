import React from 'react';
import { Route } from 'react-router-dom';
import withAuth from '../auth/withAuth';

import Callback from './Callback';
import Form from './Form';
import Login from './Login';

export default () => {
  return (
    <div>
      <Route exact={true} path='/' component={withAuth(Form)} />
      <Route exact={true} path='/callback' component={Callback} />
      <Route exact={true} path='/login' component={Login} />
    </div>
  );
};
