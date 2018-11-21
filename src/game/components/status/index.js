import React, { Component } from 'react';
import './style.css';

class Status extends Component {
  formatUnitOfTime(unitOfTime) {
    return unitOfTime < 10
      ? `0${unitOfTime}`.substring(0, 2)
      : unitOfTime.toString().substring(0, 2);
  }
  render() {
    console.log('tt', this.props.time);
    let time;
    let displayTime;
    const seconds = this.formatUnitOfTime(Math.floor(this.props.time / 1000));
    const milliseconds = this.formatUnitOfTime(this.props.time % 1000);
    displayTime = `${seconds}:${milliseconds}`;

    return (
      <div className="game-status-bar">
        <div className="game-status-timer ">{displayTime} Sec</div>
        {/* <div className="game-status-timer ">{this.props.time} Sec</div> */}
        <div className="game-status-component">{this.props.score} Coins</div>
      </div>
    );
  }
}

export default Status;
