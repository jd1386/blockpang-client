import React, { Component } from "react";
import { Container, Grid, Header, Button, Segment } from "semantic-ui-react";

class MyPage extends Component {
  render() {
    return (
      <Container>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Header as="h1">My Page</Header>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Help Companies and Companions
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Veniam dolor velit ad aliqua ut esse. Excepteur culpa
                  cupidatat aliqua in amet amet. Aliqua irure est mollit eu.
                  Eiusmod in ipsum in dolor ut occaecat ad duis aute cupidatat
                  incididunt laboris ad cupidatat.
                </p>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Make Bananas That Can Dance
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams, but
                  even bananas can be bioengineered.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge">Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default MyPage;
