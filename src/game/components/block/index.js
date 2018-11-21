import React, { Component } from "react";
import "./style.css";

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
    return (
      <div className="block" style={{ background: this.props.color }}>
        <div className="block-text">{this.props.keyDown}</div>
      </div>
    );
  }
}

export default Block;
