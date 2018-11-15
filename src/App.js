import * as React from "react";
import "./App.css";
import {
  Container,
  Grid,
  Header,
  Image,
  Button,
  Menu,
  Segment
} from "semantic-ui-react";
import { hot } from "react-hot-loader";

type Props = {
  foo: number,
  bar?: string
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <Image
                size="mini"
                src="favicon.ico"
                style={{ marginRight: "1.5em" }}
              />
              블록팡
            </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>
            <Menu.Item position="right">
              <Button as="a" inverted>
                Log in
              </Button>
              <Button as="a" primary style={{ marginLeft: "0.5em" }}>
                Sign up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>

        <Container>
          <Segment style={{ padding: "8em 0em" }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    We Help Companies and Companions
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    We can give your company superpowers to do things that they
                    never thought possible. Let us delight your customers and
                    empower your needs... through pure data analytics.
                  </p>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    We Make Bananas That Can Dance
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Yes that's right, you thought it was the stuff of dreams,
                    but even bananas can be bioengineered.
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
      </div>
    );
  }
}

export default hot(module)(App);
