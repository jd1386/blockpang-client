import React, { Component } from 'react';
import './style.scss';
import { Spring } from 'react-spring';
import { Image } from 'semantic-ui-react';
class Status extends Component {
  formatUnitOfTime(unitOfTime) {
    return unitOfTime < 10
      ? `0${unitOfTime}`.substring(0, 2)
      : unitOfTime.toString().substring(0, 2);
  }
  render() {
    let displayTime;
    const seconds = this.formatUnitOfTime(Math.floor(this.props.time / 1000));
    const milliseconds = this.formatUnitOfTime(this.props.time % 1000);
    displayTime = `${seconds}:${milliseconds}`;

    return (
      <div className="game-status-bar">
        <div className="game-status-component">{displayTime} Sec</div>
        <Spring
          from={{ number: this.props.prevScore }}
          to={{ number: this.props.currentScore }}
        >
          {props => {
            return (
              <div className="game-status-component">
                <Image id="onlycoin" size="mini" src="coin.gif" />
                {Math.round(props.number)}
              </div>
            );
          }}
        </Spring>
      </div>
    );
  }
}

export default Status;
