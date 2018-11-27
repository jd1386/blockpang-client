import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
// import { Spring } from 'react-spring';
// import { VelocityComponent } from 'velocity-react';
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

      // FIXME: animation effects ..
      // <VelocityComponent
      //   animation={{ opacity: this.state.isVisible ? 1 : 0 }}
      //   enter={{ animation: 'fadeIn' }}
      //   runAnimation={true}
      //   duration={500}
      // >
      //   <div
      //     className="block block-bottom"
      //     style={{ background: this.props.color }}
      //   >
      //     {this.props.image}
      //     <div className="inner-text">
      //       {this.props.keyDown}
      //       {bonusScore}
      //     </div>
      //   </div>
      // </VelocityComponent>
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
