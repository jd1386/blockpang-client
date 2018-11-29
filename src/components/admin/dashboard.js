import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Image,
  Breadcrumb,
  Statistic,
  Segment
} from 'semantic-ui-react';

class Dashboard extends Component {
  render() {
    return (
      <Segment vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={13}>
              <Header as="h1">Dashboard</Header>
            </Grid.Column>
            <Grid.Column width={3}>
              <Breadcrumb>
                <Breadcrumb.Section>Admin</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle" />
                <Breadcrumb.Section active>
                  <a href="/admin">Dashboard</a>
                </Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
          </Grid.Row>
          {/* Summary */}
          <Grid.Row>
            <Grid.Column width={4}>
              <Segment padded textAlign="center">
                <Statistic>
                  <Statistic.Value>64,104</Statistic.Value>
                  <Statistic.Label>Users</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment padded textAlign="center">
                <Statistic>
                  <Statistic.Value>390,110</Statistic.Value>
                  <Statistic.Label>Plays</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment padded textAlign="center">
                <Statistic>
                  <Statistic.Value>596,023</Statistic.Value>
                  <Statistic.Label>Coins Paid</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment padded textAlign="center">
                <Statistic>
                  <Statistic.Value>596,023</Statistic.Value>
                  <Statistic.Label>Coins Paid</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Segment padded>Content here</Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment padded>Content here</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Segment padded>Content here</Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment padded>Content here</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Dashboard;
