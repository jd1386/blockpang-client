import React, { Component } from "react";
import "./style.css";

class Status extends Component {
  render() {
    return (
      <div className="game-status-bar">
        <div className="game-status-component">{this.props.time} Sec</div>
        <div className="game-status-component">{this.props.score} Coins</div>
      </div>
    );
  }
}

export default Status;
