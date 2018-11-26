import React from 'react';
import { Image } from 'semantic-ui-react';

const stage = props => (
  <React.Fragment>
    <Image id="onlycoin" size="mini" src="icon.png" style={{ width: '4vw' }} />
    <span className="status-title">X {props.icons || '0'}</span>
  </React.Fragment>
);

export default stage;
