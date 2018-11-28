import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import BlockContent from './blockContent';

class Block extends Component {
  render() {
    return (
      <div
        className={`block ${this.props.index === 0 ? 'block-bottom' : ''}`}
        style={{ background: this.props.color }}
      >
        <BlockContent data={this.props} />
      </div>
    );
  }
}

Block.propTypes = {
  index: PropTypes.number.isRequired,
  keyDown: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  color: PropTypes.string.isRequired,
  image: PropTypes.object,
  bonusScore: PropTypes.number
};

export default Block;
