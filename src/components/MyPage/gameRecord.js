import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class gameRecord extends Component {
  render() {
    return (
      <Table basic="very" celled collapsing style={{ width: '100%' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
            <Table.HeaderCell>ICX won</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default gameRecord;
