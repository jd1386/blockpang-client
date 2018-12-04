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
  Segment,
  Card,
  Table,
  Icon,
  Loader
} from 'semantic-ui-react';
import {
  // AreaChart,
  // Area,
  // Bar,
  // BarChart,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import util from '../../util';

class Dashboard extends Component {
  // TODO: : axios로 정보 받아오고 data에 넣어주기

  constructor(props) {
    super(props);
    this.state = {
      default_score: '',
      currentBalance: '',
      recentPlays: ''
    };
  }

  _providerColor(provider) {
    let COLORS = ['#dd4b39', '#3b5998'];
    if (provider === 'google') return COLORS[0];
    else if (provider === 'facebook') return COLORS[1];
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
  async componentDidMount() {
    const firstRequest = await axios.get(
      util.API_URLS['admin_summary']
      // 'http://54.180.114.119:8000/admin/current_balance'
    );
    const secondRequest = await axios.get(
      // 'http://54.180.114.119:8000/db/transaction'
      util.API_URLS['transaction']
    );
    const secondRequest = await axios.get(util.API_URLS['latest']);
    // const thridRequest = await axios.get(
    //   'http://54.180.114.119:8000/admin/current_balance'
    // );

    console.log('firstRequest', firstRequest);

    await this.setStateAsync({
      totalTransfer: firstRequest.data.total_transfer,
      totalTransferAmount: firstRequest.data.total_transfer_amount,
      totalUsers: firstRequest.data.total_users,
      scoreAddress: firstRequest.data.score_address,
      currentBalance: firstRequest.data.current_balance,
      recentPlays: secondRequest.data
    });
  }

  render() {
    const data = [
      {
        month: '2018-07',
        googleUser: 40,
        facebookUser: 10,
        plays: 2400,
        ICXPaid: 2400
      },
      {
        month: '2018-09',
        googleUser: 30,
        facebookUser: 0,
        plays: 1398,
        ICXPaid: 2210
      },
      {
        month: '2018-10',
        googleUser: 20,
        facebookUser: 3,
        plays: 6800,
        ICXPaid: 2290
      },
      {
        month: '2018-11',
        googleUser: 27,
        facebookUser: 5,
        plays: 3908,
        ICXPaid: 2000
      },
      {
        month: '2018-12',
        googleUser: 18,
        facebookUser: 4,
        plays: 4800,
        ICXPaid: 2181
      },
      {
        month: '2019-01',
        googleUser: 2,
        facebookUser: 10,
        plays: 3800,
        ICXPaid: 2500
      },
      {
        month: '2019-02',
        googleUser: 3,
        facebookUser: 10,
        plays: 4300,
        amt: 2100
      }
    ];

    const data01 = [
      { name: 'GOOGLE USER', value: 500 },
      { name: 'FACEBOOK USER', value: 500 }
    ];

    const COLORS = ['#dd4b39', '#3b5998'];

    if (!this.state.recentPlays || this.state.recentPlays.length <= 0) {
      return (
        <Loader active inline="centered">
          Loading
        </Loader>
      );
      // return <div style={{ textAlign: 'center' }}>Data Loading...</div>;
    }

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

          <Grid.Row>
            <Card.Group>
              <Card>
                <Card.Content>
                  <Card.Header
                    style={{
                      color: '#1aaaba',
                      fontSize: '1em',
                      textAlign: 'center'
                    }}
                  >
                    ADMIN WALLET BALANCE
                  </Card.Header>
                  <Card.Description
                    style={{
                      fontFamily: `Lato,'Helvetica Neue',Arial,Helvetica,sans-serif`,
                      fontSize: '4rem',
                      textAlign: 'center',
                      color: '#1b1c1d'
                    }}
                  >
                    {this.state.currentBalance}
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card>
                <Card.Content>
                  <Card.Header
                    style={{
                      color: '#1aaaba',
                      fontSize: '1em',
                      textAlign: 'center'
                    }}
                  >
                    TOTAL ICX TRANSFER
                  </Card.Header>
                  <Card.Description
                    style={{
                      fontFamily: `Lato,'Helvetica Neue',Arial,Helvetica,sans-serif`,
                      fontSize: '4rem',
                      textAlign: 'center',
                      color: '#1b1c1d'
                    }}
                  >
                    {this.state.totalTransferAmount}
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card>
                <Card.Content>
                  <Card.Header
                    style={{
                      color: '#1aaaba',
                      fontSize: '1em',
                      textAlign: 'center'
                    }}
                  >
                    TOTAL SIGNUPS
                  </Card.Header>
                  <Card.Description
                    style={{
                      fontFamily: `Lato,'Helvetica Neue',Arial,Helvetica,sans-serif`,
                      fontSize: '4rem',
                      textAlign: 'center',
                      color: '#1b1c1d'
                    }}
                  >
                    {this.state.totalUsers}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Row>

          <Grid.Row style={{ marginBottom: 50 }}>
            <Grid.Column width={14}>
              <Segment>
                <Header as="h2" floated="left">
                  {'Monthly Transfer & ICXPaid'}
                </Header>
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                  <LineChart
                    width={800}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line
                      type="monotone"
                      dataKey="plays"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="ICXPaid" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ marginBottom: 50 }}>
            <Grid.Column width={6}>
              <Header as="h2" floated="left">
                Recent Plays
              </Header>
              <Table compact="very" celled collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Recent Players</Table.HeaderCell>
                    <Table.HeaderCell>Earn TestICX</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.recentPlays.map((play, index) => {
                    {
                      // console.log('play', play, 'index', index);
                    }
                    return index < 10 ? (
                      <Table.Row key={index}>
                        <Table.Cell>
                          <Header as="h4" image>
                            {play.profile_img_url ? (
                              <Image
                                src={play.profile_img_url}
                                rounded
                                size="mini"
                                style={{
                                  marginLeft: 'auto',
                                  marginRight: 'auto'
                                }}
                              />
                            ) : (
                              <Icon
                                name="user"
                                style={{
                                  marginLeft: 'auto',
                                  marginRight: 'auto'
                                }}
                              />
                            )}
                            <Header.Content>
                              {play.nickname ? play.nickname : play.email}
                              <Header.Subheader>
                                {play.service_provider}
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{play.amount}</Table.Cell>
                        <Table.Cell>{play.timestamp}</Table.Cell>
                      </Table.Row>
                    ) : null;
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid.Row>
          <Segment padded />
        </Grid.Row>

        <Grid.Row>
          <Segment padded>Content here</Segment>
        </Grid.Row>
      </Segment>
    );
  }
}

export default Dashboard;
