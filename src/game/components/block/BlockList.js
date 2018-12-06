import React from 'react';
import './style.scss';
import Block from './index';

class BlockList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // BlockList component should re-render as long as
    // it has a new array of blocks passed in
    return nextProps.blocks.length !== this.props.blocks.length;
  }

  render() {
    return this.props.blocks.map((block, index) => {
      return (
        <div className="block-wrapper" key={index}>
          <Block
            index={index}
            image={block.blockImage}
            color={block.color}
            keyDown={block.key}
            bonusScore={block.bonusScore}
          />
        </div>
      );
    });
  }
}

export default BlockList;
