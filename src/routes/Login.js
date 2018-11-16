import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Icon
} from "semantic-ui-react";

class Login extends Component {
  render() {
    return (
      <Container>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid centered columns={2}>
            <Grid.Column textAlign="center">
              <Header as="h1">Login/Signup Page</Header>
            </Grid.Column>

            <Grid.Row centered columns={2}>
              <Grid.Column>
                <Button icon fluid size="huge">
                  <Icon name="google" /> Login with Gmail
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button icon fluid size="huge">
                  <Icon name="facebook" /> Login with Facebook
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default Login;
