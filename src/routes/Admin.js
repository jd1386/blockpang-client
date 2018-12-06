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
    this.setState({ isAdminLoggedIn: true }, () => {
      console.log('Admin logged in', this.state);
    });
  }

  render() {
    return this.state.isAdminLoggedIn ? (
      <Router>
        <div style={{ paddingTop: '4em' }}>
          <Grid
            style={{ minHeight: 'calc(100vh - 83px)', paddingLeft: '14px' }}
          >
            <Grid.Column width={3} className="sidebar">
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={13}>
              <Switch>
                <Route exact path="/admin" component={Dashboard} />
                <Route
                  path="/admin/login"
                  render={() => <Redirect to="/admin" />}
                />
                <Route path="/admin/settings" component={Settings} />
                <Route path="/admin/log" component={Log} />
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
