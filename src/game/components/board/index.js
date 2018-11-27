import React from 'react';
import './style.scss';
import Status from '../status';

const board = props => {
  const {
    handleKeyDown,
    boardBackground,
    time,
    currentScore,
    icons,
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
        icons={icons}
        message={message}
      />
      {props.children}
    </div>
  );
};

export default board;
