import React, { Component } from 'react';
import {
  Grid,
  Header,
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
      totalUser: []
    };
  }

  _requestData() {
    this.setState({
      loading: true
    });
    axios
      .get(util.API_URLS['totaluser'], util.adminToken())
      .then(res => {
        this.setState({
          totalUser: res.data,
          loading: false
        });
      })
      .catch(err => {
        throw err;
      });
  }

  componentDidMount() {
    this._requestData();
  }

  render() {
    const { loading, totalUser } = this.state;

    return loading ? (
      <Loader active inline="centered">
        Loading
      </Loader>
    ) : (
      <Grid.Row style={{ marginBottom: '40px' }}>
        <Segment vertical textAlign="center">
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
                    Header: 'Wallet',
                    accessor: 'wallet',
                    minWidth: 280
                  },

                  {
                    Header: 'Signup Time',
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
          <Grid.Row />
          <Grid.Row />
        </Segment>
      </Grid.Row>
    );
  }
}

export default Log;
