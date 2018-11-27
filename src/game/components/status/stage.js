import React from 'react';
import { Image } from 'semantic-ui-react';
import { Spring } from 'react-spring';
import PropTypes from 'prop-types';

const stage = props => (
  <React.Fragment>
    <Image id="onlycoin" size="mini" src="icon.png" style={{ width: '4vw' }} />
    <span className="status-title">X {props.stage}</span>
  </React.Fragment>
);

stage.propTypes = {
  stage: PropTypes.number.isRequired
};

export default stage;
