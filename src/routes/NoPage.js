import React, { Component } from 'react';

import { Container, Grid, Segment } from 'semantic-ui-react';

class NoPage extends Component {
  render() {
    return (
      <Container>
        <Segment style={{ padding: '40vh 0em' }} vertical textAlign="center">
          <Grid.Column>
            <h2>Oops! Can't find such page!</h2>
          </Grid.Column>
        </Segment>
      </Container>
    );
  }
}

export default NoPage;
