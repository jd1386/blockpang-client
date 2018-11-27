import React, { Component } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';
import { Image } from 'semantic-ui-react';
import Timer from './timer';
import Stage from './stage';

class Header extends Component {
  render() {
    const { time, icons, currentScore, message } = this.props;
    return (
      <React.Fragment>
        <div className="game-status-bar">
          <div className="game-status-component">
            <Timer time={time} />
          </div>
          <div className="game-status-component">
            <Stage icons={icons} />
          </div>
          <Spring from={{ number: currentScore }} to={{ number: currentScore }}>
            {props => {
              return (
                <div className="game-status-component">
                  <Image id="onlycoin" size="mini" src="coin.gif" />
                  <span className="status-title">
                    {Math.round(props.number)}
                  </span>
                </div>
              );
            }}
          </Spring>
        </div>
        <div className="message-wrapper">{message}</div>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  time: PropTypes.number.isRequired,
  currentScore: PropTypes.number.isRequired,
  icons: PropTypes.number.isRequired,
  message: PropTypes.string
};

export default Header;
