import React, { Component } from 'react';
import './style.scss';
import { Spring } from 'react-spring';
import { Image } from 'semantic-ui-react';
class Header extends Component {
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
      <React.Fragment>
        <div className="game-status-bar">
          <div className="game-status-component">
            <Image id="onlycoin" size="mini" src="clock.gif" />
            <span className="status-title">{displayTime}</span>
          </div>
          <Spring
            from={{ number: this.props.currentScore }}
            to={{ number: this.props.currentScore }}
          >
            {props => {
              return (
                <div className="game-status-component">
                  <Image id="onlycoin" size="mini" src="coin.gif" />
                  <span className="status-title">
                    {Math.round(props.number)}
                  </span>
                </div>
              );
            }}
          </Spring>
        </div>
        <div className="message-wrapper">{this.props.message}</div>
      </React.Fragment>
    );
  }
}

export default Header;
