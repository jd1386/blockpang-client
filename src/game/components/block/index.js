import React, { Component } from "react";
import "./style.css";
import posed from "react-pose";

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ isVisible: !this.state.isVisible });
    }, 1000);
  }

  render() {
    const Box = posed.div({
      visible: { opacity: 1 },
      hidden: { opacity: 0 }
    });

    return (
      // <div
      //   className="block"
      //   style={{ background: this.props.color }}
      // >
      //   My color is: {this.props.color} <br />
      //   My key is: {this.props.keyDown}
      // </div>

      <Box
        className="box block"
        pose={this.state.isVisible ? "visible" : "hidden"}
        style={{ background: this.props.color }}
      >
        My color is: {this.props.color} <br />
        My key is: {this.props.keyDown}
      </Box>
    );
  }
}

export default Block;
