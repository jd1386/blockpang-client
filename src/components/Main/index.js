import React from "react";
import Game from "../../game";

const instruction = () => {
  return <Game.Instruction />;
};

const board = () => {
  return <Game.App />;
};

export default {
  Board: board,
  Instruction: instruction
};
