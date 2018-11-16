import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Grid } from "semantic-ui-react";

const footer = () => {
  return (
    <footer>
      <Segment inverted vertical>
        <Container textAlign="center">
          <Grid.Row>
            <p>
              Project BlockPang 2018. Visit{" "}
              <a href="https://icon.foundation">Icon Project</a>
            </p>
          </Grid.Row>
        </Container>
      </Segment>
    </footer>
  );
};

export default footer;
