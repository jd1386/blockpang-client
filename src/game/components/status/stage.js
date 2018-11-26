import React from 'react';
import { Image } from 'semantic-ui-react';

const stage = props => (
  <React.Fragment>
    <Image id="onlycoin" size="mini" src="blockchain.png" />
    <span className="status-title">X {props.stage || 0}</span>
  </React.Fragment>
);

export default stage;
