import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
import MainPage from "../components/Main";

class Main extends Component {
  main() {
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
                <MainPage.board />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <MainPage.instructions />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }

  render() {
    return this.main();
  }
}

export default Main;
