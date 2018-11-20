import React, { Component } from "react";
import "./style.css";

class Block extends Component {
  _handleOnClick(e) {
    console.log("Thank you for clicking me!", e.target);
    e.target.remove();
  }

  render() {
    return (
      <div
        className="block"
        onClick={this._handleOnClick}
        style={{ background: this.props.color }}
      >
        My color is: {this.props.color} <br />
        My key is: {this.props.keyDown}
      </div>
    );
  }
}

export default Block;
