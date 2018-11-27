import React from 'react';
import './style.scss';
import Block from './index';

class BlockList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.blocks !== this.props.blocks;
  }

  render() {
    // test
    // console.log('Block', Date.now(), this.props.blocks);
    //

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
