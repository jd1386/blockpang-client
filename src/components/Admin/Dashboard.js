import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Grid,
  Header,
  Image,
  Breadcrumb,
  Segment,
  Card,
  Icon,
  Loader,
  Label,
  Divider
} from 'semantic-ui-react';
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import util from '../../util';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      totalTransfer: '',
      totalTransferAmount: '',
      totalSignup: '',
      default_score: '',
      currentBalance: '',
      recentTransfer: [],
      totalUser: []
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
    const fourthRequest = await axios.post(util.API_URLS['stat'], {
      user: '*'
    });
    await console.log(firstRequest);
    let monthlyData = await this._graphDataSet(
      fourthRequest.data.monthly.reverse()
    );

    await this.setStateAsync({
      loading: false,
      totalTransfer: firstRequest.data.total_transfer,
      totalTransferAmount: firstRequest.data.total_transfer_amount,
      totalSignup: firstRequest.data.total_user,
      currentBalance: firstRequest.data.current_balance,
      recentTransfer: secondRequest.data,
      totalUser: thirdRequest.data,
      // totalUser: thirdRequest.data.reverse(),
      monthlyData: monthlyData
    });
  }

  _graphDataSet = datas => {
    let renamedData = [];
    datas.forEach(data => {
      renamedData.push({
        month: util.toKoreanTime(data.date_trunc, 'month'),
        number: data.count,
        amount: data.sum
      });
    });

    return renamedData;
  };
  render() {
    const {
      loading,
      currentBalance,
      totalTransferAmount,
      totalSignup,
      recentTransfer,
      totalUser,
      monthlyData
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
                        fontSize: currentBalance.length > 9 ? '2rem' : '4rem',
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
                        fontSize:
                          totalTransferAmount.length > 9 ? '2rem' : '4rem',
                        // fontSize: '4rem',
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

          <Grid.Row style={{ marginBottom: 30 }}>
            <Grid.Column width={14}>
              <Segment>
                <Header as="h2" floated="left" style={{ marginBottom: 50 }}>
                  {'Number/Amount of Monthly ICX Transaction'}
                </Header>
                <Divider hidden />
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                  <LineChart
                    width={800}
                    data={monthlyData}
                    margin={{ right: 20, left: 20, bottom: 35 }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line
                      type="monotone"
                      dataKey="number"
                      stroke="#8884d8"
                      activeDot={{ r: 7 }}
                    />
                    <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2">
                <Link
                  to="/admin/log"
                  style={{ color: 'black', textDecoration: 'none!important' }}
                >
                  Recent Transfer
                </Link>
              </Header>
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
