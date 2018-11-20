import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
import MainPage from "../components/Main";

class Main extends Component {
  render() {
    return (
      <Container>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1">Play BlockPang</Header>
              </Grid.Column>
            </Grid.Row>
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
      </Container>
    );
  }
}

export default Main;
