import React, { Component } from 'react';
import './style.css';
import { Spring } from 'react-spring';

class Block extends Component {
  render() {
    let bonusScore;
    if (this.props.bonusScore) {
      bonusScore = <h4>Bonus {this.props.bonusScore}</h4>;
    }

    return (
      <div
        className="block"
        onClick={this._handleOnClick}
        style={{ background: this.props.color }}
      >
        {this.props.image}
        <div className="block-text">
          {this.props.keyDown}
          {bonusScore}
        </div>
      </div>
    );
  }
}

export default Block;
