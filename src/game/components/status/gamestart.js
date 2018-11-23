import React, { Component } from 'react';
import './style.scss';

class Gamestart extends Component {
  render() {
    return (
      <div className="game-status-div" onClick={this.props.onClick()}>
        <div>Block Pang</div>
        <div>Start Game</div>
        <div>Insert (1) Coin ...</div>
      </div>
    );
  }
}

export default Gamestart;
