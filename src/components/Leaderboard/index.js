import React, { Component } from 'react';
import { Header, Grid, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

class Leaderboard extends Component {
  _nth(rank) {
    switch (rank) {
      case 1:
        return `${rank}st`;
      case 2:
        return `${rank}nd`;
      case 3:
        return `${rank}rd`;
      default:
        return `${rank}th`;
    }
  }

  _obfuscateEmail(email) {
    const chars = email.split('@');
    const userName = chars[0];
    const domainName = '@' + '*'.repeat(chars[1].length - 1);

    return userName + domainName;
  }

  render() {
    return (
      <div className="leaderboard">
        <Grid.Row>
          <Header className="leaderboard-header flash">Highest Score</Header>
        </Grid.Row>
        <Grid.Row className="table-container">
          <Table basic="very" collapsing compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Rank</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Score</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">User</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.records.map((record, index) => {
                return (
                  <Table.Row key={index} size="small">
                    <Table.Cell textAlign="center">
                      {this._nth(index + 1)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{record.gscore}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {record.nickname || this._obfuscateEmail(record.email)}
                    </Table.Cell>
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
