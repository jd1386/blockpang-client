import React, { Component } from 'react';
import {
  Container,
  Header,
  Grid,
  Segment,
  Table,
  Loader
} from 'semantic-ui-react';
import axios from 'axios';
import util from '../util';

class Main extends Component {
  state = {
    records: []
  };

  componentDidMount() {
    axios.get(util.API_URLS['leaderboard']).then(res => {
      this.setState({ records: res.data });
    });
  }

  _renderTable() {
    return this.state.records.length ? (
      <Table basic="very" celled collapsing style={{ width: '100%' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.records.map((record, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{record.gscore}</Table.Cell>
                <Table.Cell>{record.email}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    ) : (
      <Loader active inline="centered" content="Loading" />
    );
  }

  render() {
    return (
      <div>
        <Container>
          <Segment style={{ padding: '5.5em 0em' }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Header as="h1">Leaderboard</Header>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>{this._renderTable()}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default Main;
