import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import MainPage from '../components/Main';

class Main extends Component {
  render() {
    return (
      <div>
        <Segment style={{ padding: '5.5em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                <MainPage.Board isPlayingGame={this.props.isPlayingGame} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <MainPage.Instruction />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default Main;
