import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { Auth } from '../../auth';

type Props = RouteComponentProps<{}> & {
  auth: Auth;
};

class Callback extends Component<Props, {}> {
  async componentDidMount() {
    await this.props.auth.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

export default withRouter(Callback);
