import React, { Component } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import Timer from './Timer';
import Stage from './Btage';
import Score from './Bcore';

class Header extends Component {
  render() {
    const { time, stage, score, message } = this.props;
    return (
      <React.Fragment>
        <div className="game-status-bar">
          <div className="game-status-component">
            <Timer time={time} />
          </div>
          <div className="game-status-component">
            <Stage stage={stage} />
          </div>
          <div className="game-status-component">
            <Score score={score} />
          </div>
        </div>
        <div className="message-wrapper">{message}</div>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  time: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  message: PropTypes.string
};

export default Header;
