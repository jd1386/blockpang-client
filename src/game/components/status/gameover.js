import React, { Component } from 'react';
import './style.scss';
import Status from './index';

const gameoverMessages = {
  exceedBlockLimit: 'You have too many blocks',
  missInput: 'You must type the right key',
  timeover: 'time over'
};

class Gameover extends Component {
  _getMessage() {
    return gameoverMessages[this.props.reason];
  }

  render() {
    return (
      <React.Fragment>
        <Status.Header
          time={this.props.lefttime}
          currentScore={this.props.score}
        />

        <div className="game-status-main">
          <div className="header">Game Over</div>
          <div className="content">
            <div>{this._getMessage()}</div>
            <div className="flash">Press W KEY to restart</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Gameover;
