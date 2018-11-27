import React from 'react';
import './style.scss';
import Status from '../status';

const board = props => {
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
        currentScore={currentScore}
        stage={stage}
        message={message}
      />
      {props.children}
    </div>
  );
};

export default board;
