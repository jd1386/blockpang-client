import React, { Component } from 'react';
import './style.css';

class Block extends Component {
  _handleOnClick(e) {
    console.log('Thank you for clicking me!', e.target);
    // e.target.remove();
  }

  render() {
    return (
      <div
        className="block"
        onClick={this._handleOnClick}
        style={{ background: this.props.color }}
      >
        <div className="block-text">{this.props.keyDown}</div>
      </div>
    );
  }
}

export default Block;
