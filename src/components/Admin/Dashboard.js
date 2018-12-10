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
      totalIcxTransfer: '',
      totalSignups: '',
      default_score: '',
      adminWalletBalance: '',
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
    let monthlyData = await this._graphDataSet(fourthRequest.data.monthly);

    await this.setStateAsync({
      loading: false,
      adminWalletBalance: Number(firstRequest.data.current_balance).toFixed(2),
      totalIcxTransfer: Number(firstRequest.data.total_transfer_amount).toFixed(
        2
      ),
      totalSignups: firstRequest.data.total_user,
      recentTransfer: secondRequest.data,
      totalUser: thirdRequest.data,
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
      adminWalletBalance,
      totalIcxTransfer,
      totalSignups,
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
            <Grid.Column width={15}>
              <Header as="h1">Dashboard</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={15}>
              <Card.Group style={{ flexWrap: 'nowrap' }}>
                <Card style={{ padding: '8px 0px 15px', width: '32%' }}>
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
                        fontSize: 'calc(16px + 2.3vw)',
                        fontWeight: 'bold',
                        textAlign: 'center',

                        color: '#1b1c1d'
                      }}
                    >
                      {adminWalletBalance}
                    </Card.Description>
                  </Card.Content>
                </Card>

                <Card style={{ padding: '8px 0px 15px', width: '32%' }}>
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
                        fontSize: 'calc(16px + 2.3vw)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#1b1c1d'
                      }}
                    >
                      {totalIcxTransfer}
                    </Card.Description>
                  </Card.Content>
                </Card>

                <Card style={{ padding: '8px 0px 15px', width: '32%' }}>
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
                        fontSize: 'calc(16px + 2.3vw)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#1b1c1d'
                      }}
                    >
                      {totalSignups}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={15}>
              <Segment style={{ display: 'flex', flexDirection: 'column' }}>
                <Header as="h2" floated="left" style={{ marginBottom: 15 }}>
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
            <Grid.Column width={15}>
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
                        minWidth: 130,
                        maxWidth: 150,
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
                        Header: 'ICX',
                        accessor: 'amount',
                        maxWidth: 100,
                        Cell: props =>
                          props.value > 100 ? (
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                              {Number(props.value).toFixed(2)}
                            </span>
                          ) : (
                            <span>{Number(props.value).toFixed(2)}</span>
                          ),
                        sortMethod: (a, b) => {
                          if (Number(a) === Number(b)) {
                            return Number(a) > Number(b) ? 1 : -1;
                          }
                          return Number(a) > Number(b) ? 1 : -1;
                        }
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
            <Grid.Column width={15}>
              <Header as="h2">
                <Link
                  to="/admin/totaluser"
                  style={{ color: 'black', textDecoration: 'none!important' }}
                >
                  Total User
                </Link>
              </Header>
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
                        minWidth: 130,
                        maxWidth: 150,
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
                        Header: 'Signup Time',
                        accessor: 'timestamp',
                        Cell: props => (
                          <span>{util.toKoreanTime(props.value)}</span>
                        )
                      }
                    ]
                  }
                ]}
                defaultPageSize={5}
                // defaultSorted={[
                //   {
                //     id: 'timestamp',
                //     desc: true
                //   }
                // ]}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row />
          <Grid.Row />
        </Grid>
      </Segment>
    );
  }
}

export default Dashboard;
