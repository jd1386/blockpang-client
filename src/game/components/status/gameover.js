import React, { Component } from 'react';
import './style.scss';
import { Spring } from 'react-spring';
import PropTypes from 'prop-types';
import util from '../../../util';

const gameoverMessages = {
  exceedBlockLimit: 'You have too many blocks',
  missInput: 'You must type the right key',
  timeover: 'time over',
  inputSourceKorean: '재시작하려면 영문 자판으로 변환 후 w를 눌러주세요!'
};

const GameoverMessage = props => {
  return (
    <div className="game-status-main">
      <div className="header gameover">Game Over</div>
      <div className="content gameover">{props.children}</div>
    </div>
  );
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

  componentDidMount() {
    const userData = {
      user: util.userData(),
      wallet: util.walletAddress(),
      game_score: this.props.score
    };

    if (userData.user) {
      if (userData.wallet) {
        this.setState({ isLoggedIn: true, walletAddress: userData.wallet });
      } else {
        this.setState({ isLoggedIn: true });
        localStorage.setItem('previousGameScore', userData.gameScore);
      }
    } else {
      // user is not logged in
      // save game score to localStorage
      // to give the user when she logs in
      localStorage.setItem('previousGameScore', userData.gameScore);
    }

    // use setTimeout to give more room between
    // render and _requestTransfer call
    if (userData.wallet && userData.game_score > 0) {
      setTimeout(() => {
        util.requestTransfer(userData.game_score);
      }, 1000);
    }
  }

  render() {
    return this.state.isLoggedIn ? (
      this.state.walletAddress ? (
        <GameoverMessage>
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
        </GameoverMessage>
      ) : (
        <GameoverMessage>
          <div className="prize">
            Your wallet is not registred. Please register on My Page.
          </div>
          <div className="gameover-message">
            <div className="flash">Press W KEY to restart</div>
          </div>
        </GameoverMessage>
      )
    ) : (
      <GameoverMessage>
        <div className="prize">
          You've won <span>{this._animateScore(this.props.score)} </span>
          ICX!
          <br />
          Log in now to claim your ICX
        </div>
        <div className="gameover-message">
          <div className="flash">Log in to claim your ICX</div>
        </div>
      </GameoverMessage>
    );
  }
}

Gameover.propTypes = {
  reason: PropTypes.string.isRequired
};

export default Gameover;
