import React, { Component } from 'react';
import {
  Container,
  Header,
  Grid,
  Segment,
  Table,
  Loader
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard">
        <Grid.Row>
          <Header className="leaderboard-header">High Score</Header>
        </Grid.Row>
        <Grid.Row className="table-container">
          <Table basic="very" collapsing style={{ minWidth: '300px' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Rank</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">User</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.records.map((record, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                    <Table.Cell textAlign="center">{record.gscore}</Table.Cell>
                    <Table.Cell>{record.email}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Row>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  records: PropTypes.array.isRequired
};

export default Leaderboard;
