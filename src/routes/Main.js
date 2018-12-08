import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import MainPage from '../components/Main';

class Main extends Component {
  render() {
    return (
      <Segment style={{ paddingTop: '11vh' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <MainPage.Board isPlayingGame={this.props.isPlayingGame} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Main;
