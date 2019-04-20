import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import auth, { Auth } from '../auth';
import Callback from './Callback';
import Form from './Form';
import NavBar from './NavBar';
import SecuredRoute from './SecuredRoute';

type Props = {
  auth: Auth;
};

type State = {
  checkingSession: boolean;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      checkingSession: true,
    };
  }

  async componentDidMount() {
    if (window.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }

    try {
      await this.props.auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') {
        console.log(err.error);
      }
    } finally {
      this.setState({ checkingSession: false });
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Route
          path='/'
          auth={auth}
          checkingSession={this.state.checkingSession}
          component={Form}
        />
        <Route path='/callback' component={Callback} />
      </div>
    );
  }
}

export default App;
