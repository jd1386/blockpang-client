import React, { Component } from 'react';
import { Grid, Header, Segment, Image, Icon, Loader } from 'semantic-ui-react';
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
      .get(util.API_URLS['transaction'], util.adminToken())
      .then(res => {
        this.setState({
          recentTransfer: res.data,
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
    const { loading, recentTransfer } = this.state;

    return loading ? (
      <Loader active inline="centered">
        Loading
      </Loader>
    ) : (
      <Grid.Row style={{ marginBottom: '40px' }}>
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
