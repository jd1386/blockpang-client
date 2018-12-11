/* eslint-disable default-case */
import React, { Component } from 'react';
import './style.scss';
import { Spring } from 'react-spring';
import PropTypes from 'prop-types';
import util from '../../../util';
import { Redirect } from 'react-router-dom';

const gameoverMessages = {
  exceedBlockLimit: '',
  missInput: 'You must type the right key',
  timeover: 'time over',
  inputSourceKorean: '재시작하려면 영문 자판으로 변환 후 W키를 눌러주세요!'
};

const GameoverMessage = props => {
  return (
    <div className="game-status-main" onClick={props.onClick}>
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
      isRedirectLogin: false,
      walletAddress: '',
      transferStatus: 'default',
      transferResultMessage: '',
      transferAmount: 0
    };
  }

  _redirectLogin = () => {
    this.setState({ isRedirectLogin: true });
  };

  _animateScore(score) {
    return (
      <Spring from={{ number: 0 }} to={{ number: score }} delay={350}>
        {springProps => {
          return Math.round(springProps.number);
        }}
      </Spring>
    );
  }

  _renderTransferStatus() {
    return (
      <div>{this._transferResponseMessages(this.state.transferStatus)}</div>
    );
  }

  _transferResponseMessages(status) {
    switch (status) {
      case 'default':
        return 'Requesting transfer...';
      case 'success':
        return `Successfully transferred ${
          this.state.transferAmount
        } ICX to your wallet`;
      case 'fail':
        return this.state.transferResultMessage;
    }
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
        localStorage.setItem('previousGameScore', userData.game_score);
      }
    } else {
      // user is not logged in
      // save game score to localStorage
      // to give the user when she logs in
      localStorage.setItem('previousGameScore', userData.game_score);
    }

    // use setTimeout to give more room between
    // render and _requestTransfer call
    if (userData.wallet) {
      setTimeout(async () => {
        const res = await util.requestTransfer(userData.game_score);
        switch (res.transaction_result) {
          case 'success':
            this.setState({
              transferStatus: 'success',
              transferAmount: res.transfer_icx
            });
            break;
          case 'fail':
            this.setState({
              transferStatus: 'fail',
              transferResultMessage: res.message
            });
            break;
        }
      }, 0);
    }
  }

  render() {
    const { isRedirectLogin, isLoggedIn, walletAddress } = this.state;

    if (isRedirectLogin) {
      return <Redirect to={'/login'} />;
    }

    return isLoggedIn ? (
      walletAddress ? (
        <GameoverMessage onClick={this.props.onClick}>
          <div className="prize">
            {this._renderTransferStatus(this.state.transferStatus)}
          </div>
          <div className="gameover-message">
            <div>{gameoverMessages[this.props.reason]}</div>
            <div className="flash">Press W KEY to restart</div>
          </div>
        </GameoverMessage>
      ) : (
        <GameoverMessage>
          <div className="prize">
            Your wallet is not registered. Please register on My Page.
          </div>
          <div className="gameover-message" onClick={this.props.onClick}>
            <div className="flash">Press W KEY to restart</div>
          </div>
        </GameoverMessage>
      )
    ) : (
      <GameoverMessage onClick={this._redirectLogin}>
        <div className="prize">
          You've scored <span>{this._animateScore(this.props.score)}!</span>
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
