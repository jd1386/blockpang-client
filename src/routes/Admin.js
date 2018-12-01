import React, { Component } from 'react';
import {
  Link,
  Redirect,
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Container, Grid, Header, Button, Segment } from 'semantic-ui-react';
import Sidebar from '../components/admin/sidebar';
import '../components/admin/style.scss';
import Dashboard from '../components/admin/dashboard';
import Page2 from '../components/admin/page2';
import Page3 from '../components/admin/page3';

class Admin extends Component {
  render() {
    //FIXME: fix the following auth logic below
    if (!localStorage.getItem('userData')) {
      return <Redirect to={'/'} />;
    }

    return (
      <Router>
        <div style={{ paddingTop: '4em' }}>
          <Grid
            style={{ minHeight: 'calc(100vh - 83px)', paddingLeft: '14px' }}
          >
            <Grid.Column width={3} className="sidebar">
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={13}>
              <Route exact path="/admin" component={Dashboard} />
              <Route path="/admin/page-2" component={Page2} />
              <Route path="/admin/page-3" component={Page3} />
            </Grid.Column>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default Admin;
