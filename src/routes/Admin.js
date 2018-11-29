import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Grid, Header, Button, Segment } from 'semantic-ui-react';
import Sidebar from '../components/admin/sidebar';
import '../components/admin/style.scss';

class Admin extends Component {
  render() {
    //FIXME: fix the following auth logic below
    if (!localStorage.getItem('userData')) {
      return <Redirect to={'/'} />;
    }

    return (
      <div style={{ paddingTop: '4em' }}>
        <Grid style={{ minHeight: 'calc(100vh - 83px)' }}>
          <Grid.Column width={3} className="sidebar">
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={13}>
            <Segment style={{ padding: '4em 0em' }} vertical>
              <Grid container stackable verticalAlign="middle">
                <Grid.Row>
                  <Header as="h1">Admin Page</Header>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                      We Help Companies and Companions
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                      We can give your company superpowers to do things that
                      they never thought possible. Let us delight your customers
                      and empower your needs... through pure data analytics.
                    </p>
                    <Header as="h3" style={{ fontSize: '2em' }}>
                      We Make Bananas That Can Dance
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                      Yes that's right, you thought it was the stuff of dreams,
                      but even bananas can be bioengineered.
                    </p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Button size="huge">Check Them Out</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Admin;
