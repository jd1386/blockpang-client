import React, { Component } from 'react';
import {
  Switch,
  Redirect,
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import Sidebar from '../components/Admin/Sidebar';
import '../components/Admin/style.scss';
import Dashboard from '../components/Admin/Dashboard';
import Login from '../components/Admin/Login';
import Settings from '../components/Admin/Settings';
import Log from '../components/Admin/Log';
import Totaluser from '../components/Admin/Totaluser';
import NoPage from '../routes/NoPage';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.adminToken = localStorage.getItem('adminToken') || null;
    this.state = {
      isAdminLoggedIn: this.adminToken || false
    };
  }

  _onLogIn() {
    this.setState({ isAdminLoggedIn: true });
    this.props.onAdminLogin();
  }

  render() {
    return this.state.isAdminLoggedIn ? (
      <Router>
        <div style={{ paddingTop: '4em' }}>
          <Grid
            columns={2}
            stackable
            style={{ minHeight: 'calc(100vh - 83px)', padding: '0 14px' }}
          >
            <Grid.Column className="sidebar" width={3}>
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={13}>
              <Switch>
                <Route exact path="/admin" component={Dashboard} />
                <Route
                  exact
                  path="/admin/login"
                  render={() => <Redirect to="/admin" />}
                />
                <Route exact path="/admin/settings" component={Settings} />
                <Route exact path="/admin/log" component={Log} />
                <Route exact path="/admin/totaluser" component={Totaluser} />
                <Route component={NoPage} />
              </Switch>
            </Grid.Column>
          </Grid>
        </div>
      </Router>
    ) : (
      <Router>
        <Switch>
          <Route
            exact
            path="/admin/login"
            render={() => <Login onLogIn={() => this._onLogIn()} />}
          />
          <Route component={NoPage} />
        </Switch>
      </Router>
    );
  }
}

export default Admin;
