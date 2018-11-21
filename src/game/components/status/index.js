import React, { Component } from 'react';
import './style.css';
import { Spring } from 'react-spring';

class Status extends Component {
  render() {
    return (
      <div className="game-status-bar">
        <div className="game-status-component">{this.props.time} Sec</div>
        <Spring
          from={{ number: this.props.prevScore }}
          to={{ number: this.props.currentScore }}
        >
          {props => {
            return (
              <div className="game-status-component">
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
