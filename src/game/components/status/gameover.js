import React, { Component } from 'react';
import './style.css';

class Gameover extends Component {
  render() {
    let message;
    if (this.props.reason === 'miss') {
      message =
        'HAHA! GAME OVER! You MUST type RIGHT KEY! If your want restart, press S KEY.';
    }
    if (this.props.reason === 'timeover') {
      message = 'TIME OVER! If your want restart, press ANY KEY.';
    }
    return <div>{message}</div>;
  }
}

export default Gameover;
