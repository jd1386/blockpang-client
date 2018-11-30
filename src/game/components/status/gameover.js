import React, { Component } from 'react';
import './style.scss';
import { Spring } from 'react-spring';
import PropTypes from 'prop-types';
import axios from 'axios';

const gameoverMessages = {
  exceedBlockLimit: 'You have too many blocks',
  missInput: 'You must type the right key',
  timeover: 'time over',
  inputSourceKorean: '재시작하려면 영문 자판으로 변환 후 w를 눌러주세요!'
};

class Gameover extends Component {
  _requestTransfer(userData) {
    axios
      .post('http://34.217.9.241/transfer', userData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        throw err;
      });
  }

  _animateScore(score) {
    return (
      <Spring from={{ number: 0 }} to={{ number: score }} delay={350}>
        {springProps => {
          return Math.round(springProps.number);
        }}
      </Spring>
    );
  }

  componentDidMount() {
    // FIXME: replace the following hardcoded address
    // with the user's registered wallet address
    const userData = {
      address: 'asldkfjljklasdjflkewljasd09u1230asdlk',
      value: this.props.score
    };

    // use setTimeout to give more room between
    // render and _requestTransfer call
    setTimeout(() => {
      this._requestTransfer(userData);
    }, 2000);
  }

  render() {
    return (
      <div className="game-status-main">
        <div className="header gameover">Game Over</div>
        <div className="content gameover">
          <div className="prize">
            You've won <span>{this._animateScore(this.props.score)}</span> ICX!
            <br />
            Check back my page soon.
          </div>
          <div className="gameover-message">
            <div>{gameoverMessages[this.props.reason]}</div>
            <div className="flash">Press W KEY to restart</div>
          </div>
        </div>
      </div>
    );
  }
}

Gameover.propTypes = {
  reason: PropTypes.string.isRequired
};

export default Gameover;
