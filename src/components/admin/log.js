import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Table,
  Image,
  Icon,
  Label,
  Loader,
  Dimmer
} from 'semantic-ui-react';
import axios from 'axios';
import util from '../../util';

const recentPlay2 = [];
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
class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentPlays: []
    };
  }

  _requestData() {
    axios
      .get(util.API_URLS['latest'])
      .then(res => {
        console.log('res', res.data);
        this.setState({
          recentPlays: res.data
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  _providerColor(provider) {
    let COLORS = ['#dd4b39', '#3b5998'];
    if (provider === 'google') return COLORS[0];
    else if (provider === 'facebook') return COLORS[1];
  }

  componentDidMount() {
    this._requestData();
  }

  render() {
    if (!this.state.recentPlays || this.state.recentPlays.length <= 0) {
      return (
        // <div style={{ textAlign: 'center' }}>
        //   Data Loading... If you continue to see this message, you may not be
        //   able to connect to the server or have no data.
        // </div>
        <Loader active inline="centered">
          Loading
        </Loader>
      );
    }
    return (
      <Segment vertical textAlign="center">
        <Header as="h2" floated="left">
          Recent Plays
        </Header>
        <Table
          basic="very"
          color="teal"
          celled
          // collapsing
          textAlign="center"
          style={{ marginTop: 50 }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Icon name="users" />
              </Table.HeaderCell>
              <Table.HeaderCell>Recent Players</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Earn TestICX</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {console.log('this.state', this.state)}
            {this.state.recentPlays.map((play, index) => {
              {
                // console.log('play', play, 'index', index);
                console.log('recentPlays', play);
              }
              return index >= 0 ? (
                <Table.Row key={index}>
                  <Table.Cell textAlign="center">
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
                  </Table.Cell>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content>
                        {play.nickname ? play.nickname : 'no data'}
                        {/* {play.nickname ? play.nickname : play.email} */}
                        <Header.Subheader>
                          <Label
                            style={{
                              color: 'white',
                              backgroundColor: this._providerColor(
                                play.service_provider
                              )
                            }}
                          >
                            {play.service_provider}
                          </Label>
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{play.email}</Table.Cell>
                  <Table.Cell>{play.amount}</Table.Cell>
                  <Table.Cell>{play.timestamp}</Table.Cell>
                </Table.Row>
              ) : null;
            })}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default Log;
