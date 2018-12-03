import React, { Component } from 'react';
import axios from 'axios';
import { takeRight, pick } from 'lodash';
import { Table, Container, Grid, Button } from 'semantic-ui-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

class GameRecord extends Component {
  state = {
    transactions: []
  };
  componentDidMount() {
    // TODO: replace all transactions with transactions by user
    axios
      .get('http://54.180.114.119:8000/db/transaction')
      .then(res => {
        let transactionsArray = [];

        // get the most recent 10 transactions
        takeRight(res.data, 10).forEach(transaction => {
          transactionsArray.push(pick(transaction, ['amount', 'timestamp']));
        });

        this.setState({ transactions: transactionsArray });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <Container>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <div style={{ textAlign: 'center', marginBottom: '1em' }}>
                <h2>Recent Transactions</h2>
              </div>
              <Table basic="very" celled collapsing style={{ width: '100%' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Timestamp</Table.HeaderCell>
                    <Table.HeaderCell>Score</Table.HeaderCell>
                    <Table.HeaderCell>ICX won</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.transactions.map((transaction, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{transaction.timestamp}</Table.Cell>
                        <Table.Cell>{transaction.amount * 100}</Table.Cell>
                        <Table.Cell>{transaction.amount}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
              <div style={{ textAlign: 'center' }}>
                <a
                  href={`https://tracker.icon.foundation/address/${localStorage.getItem(
                    'walletAddress'
                  )}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button primary>View more transactions</Button>
                </a>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={{ textAlign: 'center', marginBottom: '1em' }}>
                <h2>ICX Payout by timeline</h2>
              </div>
              <BarChart width={400} height={400} data={this.state.transactions}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Bar dataKey="amount" fill="#24c2d4f2" />
              </BarChart>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default GameRecord;
