import React from 'react';
import { Image } from 'semantic-ui-react';
import { Spring } from 'react-spring';
import coinImage from '../../assets/img/coin.gif';

class Score extends React.PureComponent {
  render() {
    return (
      <Spring
        from={{ number: this.props.score }}
        to={{ number: this.props.score }}
      >
        {springProps => {
          return (
            <React.Fragment>
              <Image id="onlycoin" size="mini" src={coinImage} />
              <span className="status-title">
                {Math.round(springProps.number)}
              </span>
            </React.Fragment>
          );
        }}
      </Spring>
    );
  }
}

export default Score;
