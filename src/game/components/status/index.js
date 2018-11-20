import React, { Component } from "react";
import "./style.css";

class Status extends Component {
  render() {
    return (
      <div className="game-status-bar">
        <div className="game-status-component">30 Sec</div>
        <div className="game-status-component">1200 Coins</div>
      </div>
    );
  }
}

export default Status;
