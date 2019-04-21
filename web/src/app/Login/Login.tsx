import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';

import { Auth } from '../../auth/Auth';

type Props = RouteComponentProps<{}> & {
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

export default withRouter(Login);
