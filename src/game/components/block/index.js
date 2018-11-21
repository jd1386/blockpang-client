import React, { Component } from 'react';
import './style.css';

class Block extends Component {
  _handleOnClick(e) {
    console.log('Thank you for clicking me!', e.target);
    // e.target.remove();
  }

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
        <div className="block-text">
          {this.props.keyDown}
          {bonusScore}
        </div>
      </div>
    );
  }
}

export default Block;
