import React from "react";
import "./style.css";
import Game from "../../game";

const instruction = () => {
  return <Game.Instruction />;
};

const _handleKeyDown = e => {
  console.log(e.key);
};

const board = () => {
  return (
    <div id="game-board" onKeyDown={e => _handleKeyDown(e)} tabIndex="0">
      <Game.Status />
      <Game.Block color={"yellow"} keyDown={"w"} />
      <Game.Block color={"green"} keyDown={"a"} />
      <Game.Block color={"blue"} keyDown={"s"} />
      <Game.Block color={"red"} keyDown={"d"} />
      <Game.Block color={"yellow"} keyDown={"w"} />
    </div>
  );
};

export default {
  Board: board,
  Instruction: instruction
};
