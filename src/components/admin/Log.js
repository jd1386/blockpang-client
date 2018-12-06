import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  // Container,
  Grid,
  Header,
  // Button,
  Segment,
  Image,
  Icon,
  Label,
  Loader
} from 'semantic-ui-react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import util from '../../util';

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      recentTransfer: []
    };
  }

  _requestData() {
    this.setState({
      loading: true
    });
    axios
      .get(util.API_URLS['transaction'])
      .then(res => {
        console.log('res', res.data);
        this.setState({
          recentTransfer: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  componentDidMount() {
    this._requestData();
  }

  render() {
    const { loading, recentTransfer } = this.state;

    return loading ? (
      <Loader active inline="centered">
        Loading
      </Loader>
    ) : (
      <Grid.Row>
        <Segment vertical textAlign="center">
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
            defaultFilterMethod={
              (filter, row) =>
                // String(row[filter.id]) === filter.value
                String(row[filter.id]).includes(filter.value)
              // String(row[filter.id]) === filter.value
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
