import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const stage = props => (
  <React.Fragment>
    <Image id="onlycoin" size="mini" src="icon.png" style={{ width: '4vw' }} />
    <span className="status-title">X {props.icons}</span>
  </React.Fragment>
);

stage.propTypes = {
  icons: PropTypes.number.isRequired
};

export default stage;
