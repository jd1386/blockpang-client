import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const Gamestart = props => {
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

Gamestart.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Gamestart;
