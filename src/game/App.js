<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Block from './components/block';
import Status from './components/status';
=======
import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { random } from "lodash";
import Block from "./components/block";
import Status from "./components/status";
>>>>>>> f5117a579491305d721a6130642d2c04508c7618

const defaultState = () => {
  // TODO:
  // check boardSize based on user's screen size
  // update boardSize
  let userBoardSize = 30;
  // return initial state
  return {
    boardSize: userBoardSize,
    time: 30,
    score: 0,
    blocks: []
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
    // generate an array of random blocks
    let colors = ["red", "green", "blue"];
    let keys = ["a", "s", "d"];
    let randomBlocks = [];

    for (let i = 0; i < 5; i++) {
      let randomIndex = random(colors.length - 1);

      randomBlocks.push({
        color: colors[randomIndex],
        key: keys[randomIndex]
      });
    }
    return randomBlocks;
  }

  _renderDefaultBlocks() {
    // render the default blocks
    return this.state.blocks.map((block, index) => {
      return <Block key={index} color={block.color} keyDown={block.key} />;
    });
  }

  componentDidMount() {
    this.setState({ blocks: this._generateDefaultBlocks() });
  }

  render() {
    return (
      <div id="game-board" tabIndex="0" onKeyDown={this._handleKeyDown}>
        <Status time={this.state.time} score={this.state.score} />
        <div className="blocks-container">{this._renderDefaultBlocks()}</div>
      </div>
    );
  }
}

export default App;
