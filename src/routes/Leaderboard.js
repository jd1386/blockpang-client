import React, { Component } from 'react';
import LeaderboardTable from '../components/Leaderboard';
import { Container, Grid, Segment, Loader } from 'semantic-ui-react';
import axios from 'axios';
import util from '../util';

class Leaderboard extends Component {
  state = {
    records: []
  };

  componentDidMount() {
    axios.get(util.API_URLS['leaderboard']).then(res => {
      console.log(res.data);
      this.setState({ records: res.data });
    });
  }

  _renderTable() {
    return this.state.records.length ? (
      <LeaderboardTable records={this.state.records} />
    ) : (
      <Loader active inline="centered" content="Loading" />
    );
  }

  render() {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh' }}>
        <Container>
          <Segment style={{ padding: '5.5em 0em' }} vertical>
            <Grid container doubling verticalAlign="middle">
              <Grid.Row>
                <Grid.Column>{this._renderTable()}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default Leaderboard;
