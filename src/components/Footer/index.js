import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Segment,
  Header,
  Grid,
  Image,
  Button,
  Menu
} from "semantic-ui-react";
import "./style.css";

const footer = () => {
  return (
    <div className="footer">
      <Segment inverted vertical>
        <Container textAlign="center">
          <Grid.Row>
            <p>Project BlockPang 2018</p>
          </Grid.Row>
        </Container>
      </Segment>
    </div>
  );
};

export default footer;
