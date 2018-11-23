import React, { Component } from 'react';
import './style.scss';
import Status from './index';

class Gamestart extends Component {
  render() {
    return (
      <React.Fragment>
        <Status.Header time={30000} currentScore={0} />

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
