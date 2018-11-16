import React, { Component } from "react";
import { Container, Grid, Header, Button, Segment } from "semantic-ui-react";

class Home extends Component {
  render() {
    return React.createElement(
      Container,
      null,
      React.createElement(
        Segment,
        { style: { padding: "8em 0em" }, vertical: true },
        React.createElement(
          Grid,
          { container: true, stackable: true, verticalAlign: "middle" },
          React.createElement(
            Grid.Row,
            null,
            React.createElement(
              Header,
              { as: "h1" },
              "Main"
            )
          ),
          React.createElement(
            Grid.Row,
            null,
            React.createElement(
              Grid.Column,
              null,
              React.createElement(
                Header,
                { as: "h3", style: { fontSize: "2em" } },
                "We Help Companies and Companions"
              ),
              React.createElement(
                "p",
                { style: { fontSize: "1.33em" } },
                "We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs... through pure data analytics."
              ),
              React.createElement(
                Header,
                { as: "h3", style: { fontSize: "2em" } },
                "We Make Bananas That Can Dance"
              ),
              React.createElement(
                "p",
                { style: { fontSize: "1.33em" } },
                "Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered."
              )
            )
          ),
          React.createElement(
            Grid.Row,
            null,
            React.createElement(
              Grid.Column,
              { textAlign: "center" },
              React.createElement(
                Button,
                { size: "huge" },
                "Check Them Out"
              )
            )
          )
        )
      )
    );
  }
}

export default Home;