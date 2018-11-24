import React from 'react';
import './style.scss';

const gamestart = props => {
  return (
    <div className="game-status-main" onClick={props.onClick()}>
      <div className="header">
        Block
        <br /> Pang
      </div>
      <div className="content">
        <div>Click to Play</div>
        <div className="flash">Insert (1) Coin ...</div>
      </div>
    </div>
  );
};

export default gamestart;
