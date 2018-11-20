import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Block from './components/block';
import Status from './components/status';

const defaultState = () => {
  // check boardSize based on user's screen size

  // update boardSize
  let userBoardSize = 30;
  // return initial state
  return {
    boardSize: userBoardSize,
    time: 30,
    score: 0,
    // TODO: block objects are hardcoded below
    // generate default blocks dynamically
    blocks: [
      { color: 'red', key: 'd' },
      { color: 'yellow', key: 'a' },
      { color: 'blue', key: 's' },
      { color: 'yellow', key: 'a' },
      { color: 'blue', key: 's' }
    ]
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState();
  }

  _handleKeyDown = e => {
    console.log(e.key);
    // key 값이 일치하면, blocks 데이터를 삭제한다.
    let nextBlocks = this.state.blocks.slice(0, this.state.blocks.length);
    if (e.key === nextBlocks[nextBlocks.length - 1].key) {
      nextBlocks.pop();
      console.log('key가 일치하네요!');
      this.setState({ blocks: nextBlocks });
    }
  };

  _generateDefaultBlocks() {
    return this.state.blocks.map((block, index) => {
      return <Block key={index} color={block.color} keyToPress={block.key} />;
    });
  }

  render() {
    return (
      <div id="game-board" tabIndex="0" onKeyDown={this._handleKeyDown}>
        <Status time={this.state.time} score={this.state.score} />
        <div className="blocks-container">{this._generateDefaultBlocks()}</div>
      </div>
    );
  }
}

export default App;
