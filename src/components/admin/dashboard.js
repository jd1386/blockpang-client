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
  Table
} from 'semantic-ui-react';
import {
  AreaChart,
  Area,
  Bar,
  BarChart,
  LineChart,
  Line,
  Label,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

class Dashboard extends Component {
  // TODO: : axios로 정보 받아오고 data에 넣어주기

  renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  render() {
    const data = [
      {
        day: '11/30',
        googleUser: 40,
        facebookUser: 10,
        plays: 2400,
        ICXPaid: 2400
      },
      {
        day: '12/1',
        googleUser: 30,
        facebookUser: 0,
        plays: 1398,
        ICXPaid: 2210
      },
      {
        day: '12/2',
        googleUser: 20,
        facebookUser: 3,
        plays: 6800,
        ICXPaid: 2290
      },
      {
        day: '12/3',
        googleUser: 27,
        facebookUser: 5,
        plays: 3908,
        ICXPaid: 2000
      },
      {
        day: '12/4',
        googleUser: 18,
        facebookUser: 4,
        plays: 4800,
        ICXPaid: 2181
      },
      {
        day: '12/5',
        googleUser: 2,
        facebookUser: 10,
        plays: 3800,
        ICXPaid: 2500
      },
      {
        day: '12/6',
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

    const recentPlays = [
      {
        name: 'Lena0',
        icx: 22,
        provider: 'google',
        userImg:
          'https://lh4.googleusercontent.com/-HXmSZTtRF6M/AAAAAAAAAAI/AAAAAAAAAAc/PpkY31C_F_0/s96-c/photo.jpg',
        time: '2018-11-29T08:17:17.256'
      },
      {
        name: 'Lena1',
        icx: 22,
        provider: 'facebook',
        userImg:
          'https://lh4.googleusercontent.com/-HXmSZTtRF6M/AAAAAAAAAAI/AAAAAAAAAAc/PpkY31C_F_0/s96-c/photo.jpg',
        time: '2018-11-29T08:17:17.256'
      },
      {
        name: 'Lena2',
        icx: 22,
        provider: 'google',
        userImg:
          'https://lh4.googleusercontent.com/-HXmSZTtRF6M/AAAAAAAAAAI/AAAAAAAAAAc/PpkY31C_F_0/s96-c/photo.jpg',
        time: '2018-11-29T08:17:17.256'
      },
      {
        name: 'Lena3',
        icx: 22,
        provider: 'google',
        userImg:
          'https://lh4.googleusercontent.com/-HXmSZTtRF6M/AAAAAAAAAAI/AAAAAAAAAAc/PpkY31C_F_0/s96-c/photo.jpg',
        time: '2018-11-29T08:17:17.256'
      },
      {
        name: 'Lena4',
        icx: 22,
        provider: 'google',
        userImg:
          'https://lh4.googleusercontent.com/-HXmSZTtRF6M/AAAAAAAAAAI/AAAAAAAAAAc/PpkY31C_F_0/s96-c/photo.jpg',
        time: '2018-11-29T08:17:17.256'
      },
      {
        name: 'Lena5',
        icx: 22,
        provider: 'google',
        userImg:
          'https://lh4.googleusercontent.com/-HXmSZTtRF6M/AAAAAAAAAAI/AAAAAAAAAAc/PpkY31C_F_0/s96-c/photo.jpg',
        time: '2018-11-29T08:17:17.256'
      }
    ];

    const COLORS = ['#dd4b39', '#3b5998'];
    // Colors[0] google+ color
    // Colors[1] facebook color

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

          {/* <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Statistic>
                    <Statistic.Value>390</Statistic.Value>
                    <Statistic.Label>Today Plays</Statistic.Label>
                  </Statistic>
                  <ResponsiveContainer width="100%" minHeight={140}>
                    <BarChart data={data}>
                      <XAxis hide={true} dataKey="day" />
                      <Bar type="monotone" dataKey="plays" stroke="#8884d8" />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={4}>
              <Card style={{ backgroundColor: '#20c997' }}>
                <Card.Content>
                  <Statistic inverted>
                    <Statistic.Value>390,110</Statistic.Value>
                    <Statistic.Label>Total Plays</Statistic.Label>
                  </Statistic>
                  <ResponsiveContainer width="100%" minHeight={140}>
                    <AreaChart data={data}>
                      <XAxis hide={true} dataKey="day" />
                      <Area type="monotone" dataKey="plays" stroke="blue" />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Statistic>
                    <Statistic.Value>6,023</Statistic.Value>
                    <Statistic.Label>Today Test ICX Paid</Statistic.Label>
                  </Statistic>
                  <ResponsiveContainer width="100%" minHeight={140}>
                    <BarChart data={data}>
                      <XAxis hide={true} dataKey="day" />
                      <Bar type="monotone" dataKey="plays" stroke="#8884d8" />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Statistic>
                    <Statistic.Value>56,023</Statistic.Value>
                    <Statistic.Label>Total Test ICX Paid</Statistic.Label>
                  </Statistic>
                  <ResponsiveContainer width="100%" minHeight={140}>
                    <LineChart data={data}>
                      <XAxis hide={true} dataKey="day" />
                      <Line type="monotone" dataKey="plays" stroke="#8884d8" />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row> */}

          {/* <Grid.Row style={{ marginTop: 30 }}>
            <Grid.Column width={10}>
              <Segment padded>
                {' '}
                <Header as="h2" floated="left">
                  Daily Sign-Ups
                </Header>
                <ResponsiveContainer width="100%" minHeight={300}>
                  <AreaChart
                    data={data}
                    margin={{ top: 55, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <XAxis dataKey="day">
                    </XAxis>
                    <YAxis />

                    <Area type="monotone" dataKey="googleUser" stroke="blue" />
                    <Area
                      type="monotone"
                      dataKey="facebookUser"
                      stroke="#534231"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Segment>
            </Grid.Column>

            <Grid.Column width={6}>
              <Segment style={{ boxShadow: 'none', border: 'none' }}>
                <Header as="h2" floated="left">
                  Provider Distribution
                </Header>
                <PieChart width={300} height={250}>
                  <Pie
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    labelLine={false}
                    label={this.renderCustomizedLabel}
                    dataKey={data01.value}
                  >
                    {data01.map((entry, index) => (
                      <Cell fill={COLORS[index % COLORS.length]} key={index} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </Segment>
            </Grid.Column>
          </Grid.Row> */}

          <Grid.Row style={{ marginBottom: 50 }}>
            <Grid.Column width={10}>
              {/* <Segment>
                <Header as="h2" floated="left">
                  {'Plays & ICXPaid'}
                </Header>
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                  <LineChart
                    width={800}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="day" />
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
              </Segment> */}
            </Grid.Column>

            <Grid.Column width={6}>
              <Header as="h2" floated="left">
                Recent Plays
              </Header>
              <Table basic="very" celled collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Recent Players</Table.HeaderCell>
                    <Table.HeaderCell>Earn TestICX</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {recentPlays.map((play, index) => {
                    {
                      // console.log('play', play, 'index', index);
                    }
                    return index < 5 ? (
                      <Table.Row key={index}>
                        <Table.Cell>
                          <Header as="h4" image>
                            <Image src={play.userImg} rounded size="mini" />
                            <Header.Content>
                              {play.name}
                              <Header.Subheader>
                                {play.provider}
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{play.icx}</Table.Cell>
                        <Table.Cell>{play.time}</Table.Cell>
                      </Table.Row>
                    ) : null;
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid.Row>
          <Segment padded>Content here</Segment>
        </Grid.Row>
      </Segment>
    );
  }
}

export default Dashboard;
