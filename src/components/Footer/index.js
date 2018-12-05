import React from 'react';
import { Container, Segment, Grid } from 'semantic-ui-react';

const footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Segment inverted vertical>
        <Container textAlign="center">
          <Grid.Row>
            <p>
              Project BlockPang {currentYear}. Visit{' '}
              <a href="https://icon.foundation">Icon Project</a>
            </p>
          </Grid.Row>
        </Container>
      </Segment>
    </footer>
  );
};

export default footer;
