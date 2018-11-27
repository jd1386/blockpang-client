import React from 'react';
import { Image } from 'semantic-ui-react';
import { Spring } from 'react-spring';

const score = props => (
  <Spring from={{ number: props.score }} to={{ number: props.score }}>
    {springProps => {
      return (
        <React.Fragment>
          <Image id="onlycoin" size="mini" src="coin.gif" />
          <span className="status-title">{Math.round(springProps.number)}</span>
        </React.Fragment>
      );
    }}
  </Spring>
);

export default score;
