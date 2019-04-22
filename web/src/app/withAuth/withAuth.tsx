import React, { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';

import { Auth } from '../../auth/Auth';

export default (auth: Auth) => (Component: ComponentType<any>) => (
  props: any
) => {
  if (!auth.isAuthenticated()) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }

  return <Component {...props} />;
};
