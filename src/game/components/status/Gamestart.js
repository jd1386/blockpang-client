import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const Gamestart = props => {
  return (
    <div className="game-status-main">
      <div>
        <Button color="black">
          <div className="eight-bit-btn">
            Get 20 ICX without Play{' '}
            <Icon name="heart" color="red" style={{ fontSize: '1.5em' }} />
          </div>
        </Button>
      </div>
      <div onClick={props.onClick()}>
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
};

Gamestart.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Gamestart;
