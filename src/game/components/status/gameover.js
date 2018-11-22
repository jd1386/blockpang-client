import React, { Component } from 'react';
import './style.scss';

class Gameover extends Component {
  render() {
    let message;
    let lefttime;
    if (this.props.reason === 'miss') {
      message = (
        <p>
          HAHA! GAME OVER! You MUST type RIGHT KEY!
          <br />
          If your want restart, press W KEY.
        </p>
      );
      lefttime = (
        <h1>LEFT TIME : {parseInt(this.props.lefttime / 1000)} Sec</h1>
      );
    }
    if (this.props.reason === 'timeover') {
      message = 'TIME OVER! If your want restart, press W KEY.';
    }
    return (
      <div className="game-status-div">
        <h1>{message}</h1>
        <h1>SCORE : {this.props.score}</h1>
        {lefttime}
      </div>
    );
  }
}

export default Gameover;
