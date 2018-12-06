import React from 'react';
import './style.scss';
import Status from '../status';

const Board = props => {
  const {
    handleKeyDown,
    boardBackground,
    time,
    currentScore,
    stage,
    message
  } = props;

  return (
    <div
      id="game-board"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      style={boardBackground}
    >
      <Status.Header
        time={time}
        score={currentScore}
        stage={stage}
        message={message}
      />
      {props.children}
    </div>
  );
};

export default Board;
