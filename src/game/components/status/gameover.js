import React, { Component } from 'react';
import './style.scss';
import { Spring } from 'react-spring';
import PropTypes from 'prop-types';
import axios from 'axios';
import util from '../../../util';

const gameoverMessages = {
  exceedBlockLimit: 'You have too many blocks',
  missInput: 'You must type the right key',
  timeover: 'time over',
  inputSourceKorean: '재시작하려면 영문 자판으로 변환 후 w를 눌러주세요!'
};

class Gameover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      walletAddress: ''
    };
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

  _requestTransfer(userData) {
    axios
      .post('http://54.180.114.119:8000/transfer', userData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        throw err;
      });
  }

  componentDidMount() {
    const userData = {
      wallet: util.walletAddress(),
      game_score: this.props.score / 100
    };

    userData.wallet
      ? this.setState({ isLoggedIn: true, walletAddress: userData.wallet })
      : this.setState({ isLoggedIn: true });

    // use setTimeout to give more room between
    // render and _requestTransfer call
    if (userData.wallet) {
      setTimeout(() => {
        this._requestTransfer(userData);
      }, 2000);
    }
  }

  render() {
    return this.state.isLoggedIn ? (
      this.state.walletAddress ? (
        <div className="game-status-main">
          <div className="header gameover">Game Over</div>
          <div className="content gameover">
            <div className="prize">
              You've won <span>{this._animateScore(this.props.score)} </span>
              ICX!
              <br />
              Visit my page to view transactions
            </div>
            <div className="gameover-message">
              <div>{gameoverMessages[this.props.reason]}</div>
              <div className="flash">Press W KEY to restart</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="game-status-main">
          <div className="header gameover">Game Over</div>
          <div className="content gameover">
            <div className="prize">
              Your wallet is not registred. Please register on My Page.
            </div>
            <div className="gameover-message">
              <div className="flash">Press W KEY to restart</div>
            </div>
          </div>
        </div>
      )
    ) : (
      <div className="game-status-main">
        <div className="header gameover">Game Over</div>
        <div className="content gameover">
          <div className="prize">Log in to get your test ICX</div>
          <div className="gameover-message">
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
