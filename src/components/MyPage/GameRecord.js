import React, { Component } from 'react';
import axios from 'axios';
import util from '../../util';
import { takeRight, pick } from 'lodash';
import { Table, Container, Grid, Button, Loader } from 'semantic-ui-react';
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
    recentTransfers: [],
    dailyTransfers: []
  };

  _loader() {
    return <Loader active inline="centered" content="Loading" />;
  }

  _renderTable() {
    return this.state.recentTransfers.length ? (
      <React.Fragment>
        <Table basic="very" celled collapsing style={{ width: '100%' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Timestamp</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
              <Table.HeaderCell>ICX won</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.recentTransfers.map((tr, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{util.toKoreanTime(tr.timestamp)}</Table.Cell>
                  <Table.Cell>{tr.amount * 100}</Table.Cell>
                  <Table.Cell>{tr.amount}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        {this._moreTransactionsBtn()}
      </React.Fragment>
    ) : (
      <div style={{ textAlign: 'center' }}>No data available yet</div>
    );
  }

  _renderGraph() {
    return this.state.dailyTransfers.length ? (
      <BarChart
        width={400}
        height={400}
        data={this.state.dailyTransfers.reverse()}
      >
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <Bar dataKey="amount" fill="#24c2d4f2" />
      </BarChart>
    ) : (
      <div style={{ textAlign: 'center' }}>No data available yet</div>
    );
  }

  _moreTransactionsBtn() {
    return (
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <a
          href={`https://tracker.icon.foundation/address/${util.walletAddress()}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button primary>View more transactions</Button>
        </a>
      </div>
    );
  }

  componentDidMount() {
    axios
      .post(util.API_URLS['stat'], {
        user: util.userData().email
      })
      .then(res => {
        let recentTransfers = [];
        let dailyTransfers = [];

        // transaction list
        res.data.transaction_list.forEach(tr => {
          recentTransfers.push(pick(tr, ['amount', 'timestamp']));
        });

        // daily transfers
        res.data.daily.forEach(daily => {
          dailyTransfers.push({
            timestamp: util.toKoreanTime(daily.date_trunc, 'short'),
            amount: daily.sum
          });
        });

        this.setState({ recentTransfers, dailyTransfers });
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
                <h2>Recent Transfer</h2>
              </div>
              {this._renderTable()}
            </Grid.Column>
            <Grid.Column>
              <div style={{ textAlign: 'center', marginBottom: '1em' }}>
                <h2>Daily ICX Transfer</h2>
              </div>
              {this._renderGraph()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default GameRecord;
