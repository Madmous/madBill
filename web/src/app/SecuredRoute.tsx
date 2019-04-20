import { Path } from 'history';
import React from 'react';
import { Route } from 'react-router-dom';

import { Auth } from '../auth';

type Props = {
  auth: Auth;
  path: Path;
  checkingSession: boolean;
  component: any;
};

const SecuredRoute = (props: Props) => {
  const { component: Component, path, checkingSession } = props;
  return (
    <Route
      path={path}
      render={() => {
        if (checkingSession) {
          return <h3>Validating session...</h3>;
        }

        if (!props.auth.isAuthenticated()) {
          props.auth.signIn();
          return <div />;
        }
        return <Component />;
      }}
    />
  );
};

export default SecuredRoute;
