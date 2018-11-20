import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { random } from "lodash";
import Block from "./components/block";
import Status from "./components/status";

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

  _handleKeyDown(e) {
    console.log(e.key);
  }

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
