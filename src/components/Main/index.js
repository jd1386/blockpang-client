import React from 'react';
import Game from '../../game';

const Instruction = () => {
  return <Game.Instruction />;
};

const Board = () => {
  return <Game.App />;
};

export default {
  Board,
  Instruction
};
