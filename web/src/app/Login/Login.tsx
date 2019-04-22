import React from 'react';
import { Redirect } from 'react-router-dom';

import { Auth } from '../../auth/Auth';

type Props = {
  auth: Auth;
};

const Login = (props: Props) => {
    if (!props.auth.isAuthenticated()) {
      props.auth.signIn();
      return null;
    }

    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
};

export default Login;
