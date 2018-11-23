import React, { Component } from 'react';
import './style.scss';

class Gamestart extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="game-status-main" onClick={this.props.onClick()}>
          <div className="header">BlockPang</div>
          <div className="content">
            <div>Start Game</div>
            <div className="flash">Insert (1) Coin ...</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Gamestart;
