import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { Auth } from '../../auth';
import Menu from './Menu';

type Props = RouteComponentProps<{}> & {
  auth: Auth;
};

const NavBar = (props: Props) => {
  const signOut = () => {
    props.auth.signOut();
    props.history.replace('/');
  };

  return (
    <nav>
      <Link to='/'>Invoice</Link>
      {!props.auth.isAuthenticated() && (
        <button onClick={props.auth.signIn}>Sign In</button>
      )}
      {props.auth.isAuthenticated() && (
        <div>
          <label>{props.auth.getProfile().name}</label>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default withRouter(NavBar);
