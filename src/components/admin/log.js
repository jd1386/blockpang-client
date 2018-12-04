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
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import util from '../../util';

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentPlays: []
    };
  }

  _requestData() {
    axios
      .get(util.API_URLS['transaction'])
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
        <Loader active inline="centered">
          Loading
        </Loader>
      );
    }
    return (
      <Grid.Row>
        <Segment vertical textAlign="center">
          <Header as="h2">Recent Transfer</Header>

          <ReactTable
            data={this.state.recentPlays}
            getTrProps={(state, rowInfo, column) => {
              return {
                style: {
                  textAlign: 'center'
                }
              };
            }}
            columns={[
              {
                columns: [
                  {
                    Header: <Icon name="users" />,
                    textAlign: 'center',
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
                    Cell: props => (
                      <Label
                        style={{
                          color: 'white',
                          backgroundColor: this._providerColor(props.value)
                        }}
                      >
                        {props.value}
                      </Label>
                    )
                  },

                  {
                    Header: 'Email',
                    accessor: 'email'
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
                    Cell: props => <span>{util.toKoreanTime(props.value)}</span>
                  }
                ]
              }
            ]}
            defaultPageSize={20}
            style={{ width: '95%' }}
            className="-striped -highlight"
          />
        </Segment>
      </Grid.Row>
    );
  }
}

export default Log;
