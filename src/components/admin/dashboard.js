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
  Loader,
  Label
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
  // Label,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import util from '../../util';

const montlydata = [
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      default_score: '',
      currentBalance: '',
      recentTransfer: []
    };
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
  async componentDidMount() {
    this.setState({
      loading: true
    });
    const firstRequest = await axios.get(util.API_URLS['admin_summary']);
    const secondRequest = await axios.get(util.API_URLS['transaction']);
    const thirdRequest = await axios.get(util.API_URLS['totaluser']);

    await this.setStateAsync({
      totalTransfer: firstRequest.data.total_transfer,
      totalTransferAmount: firstRequest.data.total_transfer_amount,
      totalSignup: firstRequest.data.total_users,
      scoreAddress: firstRequest.data.score_address,
      currentBalance: firstRequest.data.current_balance,
      recentTransfer: secondRequest.data,
      totalUser: thirdRequest.data,
      loading: false
    });
  }

  render() {
    const {
      loading,
      currentBalance,
      totalTransferAmount,
      totalSignup,
      recentTransfer,
      totalUser
    } = this.state;

    return loading ? (
      <Loader active inline="centered">
        Loading
      </Loader>
    ) : (
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
            <Grid.Column width={15}>
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
                      {currentBalance}
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
                      {totalTransferAmount}
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
                      {totalSignup}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>
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
                    data={montlydata}
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

          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2">Recent Transfer</Header>
              <ReactTable
                data={recentTransfer}
                getTrProps={(state, rowInfo, column) => {
                  return {
                    style: {
                      textAlign: 'center'
                    }
                  };
                }}
                filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]).includes(filter.value)
                }
                columns={[
                  {
                    columns: [
                      {
                        Header: <Icon name="users" />,
                        textAlign: 'center',
                        maxWidth: 60,
                        filterable: false,
                        accessor: 'profile_img_url',
                        Cell: props =>
                          props.value ? (
                            <Image
                              src={props.value}
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
                                marginRight: 'auto',
                                textAlign: 'center'
                              }}
                            />
                          )
                      }
                    ]
                  },
                  {
                    columns: [
                      {
                        Header: 'Nickname',
                        accessor: 'nickname',
                        minWidth: 110,
                        Cell: props =>
                          props.value ? (
                            <span>{props.value}</span>
                          ) : (
                            <span style={{ textAlign: 'center' }}>no data</span>
                          )
                      },

                      {
                        Header: 'Wallet',
                        accessor: 'wallet',
                        minWidth: 280
                      }
                    ]
                  },
                  {
                    columns: [
                      {
                        Header: 'Received TEST ICX',
                        accessor: 'amount'
                      }
                    ]
                  },
                  {
                    columns: [
                      {
                        Header: 'Time',
                        accessor: 'timestamp',
                        Cell: props => (
                          <span>{util.toKoreanTime(props.value)}</span>
                        )
                      }
                    ]
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />
              {/* </Segment> */}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2">Total User</Header>
              <ReactTable
                data={totalUser}
                getTrProps={(state, rowInfo, column) => {
                  return {
                    style: {
                      textAlign: 'center'
                    }
                  };
                }}
                filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]).includes(filter.value)
                }
                columns={[
                  {
                    columns: [
                      {
                        Header: <Icon name="users" />,
                        textAlign: 'center',
                        maxWidth: 60,
                        filterable: false,
                        accessor: 'profile_img_url',
                        Cell: props =>
                          props.value ? (
                            <Image
                              src={props.value}
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
                          )
                      }
                    ]
                  },
                  {
                    columns: [
                      {
                        Header: 'Nickname',
                        accessor: 'nickname',
                        Cell: props =>
                          props.value ? (
                            <span>{props.value}</span>
                          ) : (
                            <span style={{ textAlign: 'center' }}>no data</span>
                          )
                      },
                      {
                        Header: 'Provider',
                        accessor: 'service_provider',
                        maxWidth: 100,
                        Cell: props => (
                          <Label
                            style={{
                              color: 'white',
                              backgroundColor: util._providerColor(props.value)
                            }}
                          >
                            {props.value}
                          </Label>
                        )
                      },
                      {
                        Header: 'Email',
                        accessor: 'email'
                      },

                      {
                        Header: 'SIGNUP DATE',
                        accessor: 'timestamp',
                        Cell: props => (
                          <span>{util.toKoreanTime(props.value)}</span>
                        )
                      }
                    ]
                  }
                ]}
                defaultPageSize={5}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Dashboard;
