/* eslint-disable default-case */
import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import util from '../../../util';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const btnMessages = {
  default: 'Get 30 ICX without Play',
  loading: 'Processing...',
  success: 'Success',
  fail: ''
};

class Gamestart extends Component {
  state = {
    isBtnVisible: false,
    btnStatus: 'default',
    extraBtnMessage: ''
  };

  async _onClickBtn() {
    this.setState({ btnStatus: 'loading' });
    const res = await util.requestTransfer(0);

    switch (res.transaction_result) {
      case 'loading':
        this.setState({ btnStatus: 'loading' });
        break;
      case 'success':
        this.setState({ btnStatus: 'success' });
        setTimeout(() => {
          this.setState({ isBtnVisible: false });
        }, 3500);
        break;
      case 'fail':
        this.setState({
          btnStatus: 'fail',
          extraBtnMessage: res.message
        });
        break;
    }
  }

  _renderBtnIcon(btnStatus) {
    switch (btnStatus) {
      case 'success':
        return <Icon name="check" color="green" size="large" />;
      case 'loading':
        return <Icon loading name="spinner" size="large" />;
      case 'fail':
        return (
          <Button
            color="green"
            size="mini"
            onClick={() => this.setState({ isBtnVisible: false })}
          >
            <Icon name="check" /> <span style={{ color: 'white' }}>Got it</span>
          </Button>
        );
      default:
        return <Icon name="heart" color="red" size="large" />;
    }
  }

  _renderRequestBtn() {
    return util.isLoggedIn() ? (
      <div style={{ marginBottom: '3vh' }}>
        <div className="eight-bit-div" onClick={() => this._onClickBtn()}>
          <div className="btn-inner">
            <span className="btn-message">
              {btnMessages[this.state.btnStatus]} {this.state.extraBtnMessage}
            </span>
            {this._renderBtnIcon(this.state.btnStatus)}
          </div>
        </div>
      </div>
    ) : (
      <div style={{ marginBottom: '3vh' }}>
        <Link to={'/login'}>
          <div className="eight-bit-div">
            <div className="btn-inner">
              <span className="btn-message">
                {btnMessages[this.state.btnStatus]} {this.state.extraBtnMessage}
              </span>
              {this._renderBtnIcon(this.state.btnStatus)}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ isBtnVisible: true });
  }

  render() {
    return (
      <div className="game-status-main">
        {this.state.isBtnVisible && this._renderRequestBtn()}
        <div onClick={this.props.onClick()}>
          <div className="header">
            Block
            <br /> Pang
          </div>
          <div className="content">
            <div>Click to Play</div>
            <div className="flash">Insert (1) Coin ...</div>
          </div>
        </div>
      </div>
    );
  }
}

Gamestart.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Gamestart;
