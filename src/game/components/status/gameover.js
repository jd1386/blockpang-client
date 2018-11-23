import React, { Component } from 'react';
import './style.scss';
import Status from './index';

class Gameover extends Component {
  render() {
    let message;
    let lefttime;

    if (this.props.reason === 'exceedBlockLimit') {
      message = <p>You Have Too MANY BLOCKS</p>;
      lefttime = <span>{parseInt(this.props.lefttime / 1000)} Sec</span>;
    } else if (this.props.reason === 'missInput') {
      message = <p>You MUST type the RIGHT KEY</p>;
      lefttime = (
        <span>LEFT TIME : {parseInt(this.props.lefttime / 1000)} Sec</span>
      );
    } else if (this.props.reason === 'timeover') {
      message = 'TIME OVER! If your want restart, press W KEY.';
    }

    return (
      <React.Fragment>
        <Status.Header
          time={this.props.lefttime}
          currentScore={this.props.score}
        />

        <div className="game-status-main">
          <div className="header">Game Over</div>
          <div className="content">
            <div>{message}</div>

            <div className="flash">Press W KEY to restart</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Gameover;
