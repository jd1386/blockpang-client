import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const gameoverMessages = {
  exceedBlockLimit: 'You have too many blocks',
  missInput: 'You must type the right key',
  timeover: 'time over',
  inputSourceKorean: '재시작하려면 영문 자판으로 변환 후 w를 눌러주세요!'
};

const gameover = props => {
  const { reason } = props;

  return (
    <div className="game-status-main">
      <div className="header">Game Over</div>
      <div className="content">
        <div>{gameoverMessages[reason]}</div>
        <div className="flash">Press W KEY to restart</div>
      </div>
    </div>
  );
};

gameover.propTypes = {
  reason: PropTypes.string.isRequired
};

export default gameover;
