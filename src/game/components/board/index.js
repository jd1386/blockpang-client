import React from 'react';
import './style.scss';
import Status from '../status';

const board = props => {
  return (
    <div
      id="game-board"
      tabIndex="0"
      onKeyDown={props.handleKeyDown}
      style={props.boardBackground}
    >
      {console.log(props)}
      <Status.Header
        time={props.time}
        currentScore={props.currentScore}
        icons={props.icons}
        message={props.message}
      />
      {props.children}
    </div>
  );
};
export default board;
