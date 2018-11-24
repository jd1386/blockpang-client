import React, { Component } from 'react';
import './style.scss';

const gameoverMessages = {
  exceedBlockLimit: 'You have too many blocks',
  missInput: 'You must type the right key',
  timeover: 'time over'
};

class Gameover extends Component {
  render() {
    return (
      <div className="game-status-main">
        <div className="header">Game Over</div>
        <div className="content">
          <div>{gameoverMessages[this.props.reason]}</div>
          <div className="flash">Press W KEY to restart</div>
        </div>
      </div>
    );
  }
}

export default Gameover;
