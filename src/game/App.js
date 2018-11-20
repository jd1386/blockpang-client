import React from "react";
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
    this.blockColors = ["red", "green", "blue"];
    this.blockKeys = ["a", "s", "d"];
    this.state = defaultState();
  }

  _handleKeyDown = e => {
    console.log(e.key);
    // key 값이 일치하면, blocks 데이터를 삭제한다.
    let nextBlocks = this.state.blocks.slice(0, this.state.blocks.length);
    if (e.key === nextBlocks[nextBlocks.length - 1].key) {
      nextBlocks.pop();
      console.log("key가 일치하네요!");
      this.setState({ blocks: nextBlocks });

      // 약간의 시간 간격을 두고 새로운 블럭을 스택 상단에 쌓는다
      // TODO: 지금은 기본 기능만 구현한 것이므로
      // 아래 로직은 향후 바뀔 수 있음
      setTimeout(() => {
        console.log("new block!");
        this.setState({
          blocks: [this._generateRandomBlock(), ...this.state.blocks]
        });
      }, 400);
    }
  };

  _generateRandomBlock() {
    let randomIndex = random(this.blockColors.length - 1);

    return {
      color: this.blockColors[randomIndex],
      key: this.blockKeys[randomIndex]
    };
  }

  _generateDefaultBlocks() {
    // generate an array of random blocks
    let randomBlocks = [];

    for (let i = 0; i < 5; i++) {
      randomBlocks.push(this._generateRandomBlock());
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
