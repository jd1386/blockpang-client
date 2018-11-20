import React from "react";
import ReactDOM from "react-dom";
import Block from "./components/block";

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
      { color: "red", key: "d" },
      { color: "yellow", key: "a" },
      { color: "blue", key: "s" },
      { color: "yellow", key: "a" },
      { color: "blue", key: "s" }
    ]
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState();
  }

  render() {
    let blockElements = this.state.blocks.map((block, index) => {
      return <Block key={index} color={block.color} keyToPress={block.key} />;
    });
    return blockElements;
  }
}

export default App;
