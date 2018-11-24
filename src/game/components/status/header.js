import React, { Component } from 'react';
import './style.scss';
import { Spring } from 'react-spring';
import { Image } from 'semantic-ui-react';
import Timer from './timer';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="game-status-bar">
          <div className="game-status-component">
            <Timer time={this.props.time} />
          </div>
          <Spring
            from={{ number: this.props.currentScore }}
            to={{ number: this.props.currentScore }}
          >
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
        <div className="message-wrapper">{this.props.message}</div>
      </React.Fragment>
    );
  }
}

export default Header;
