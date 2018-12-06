import React from 'react';
import { Image } from 'semantic-ui-react';
import iconImage from '../../assets/img/icon.png';
import PropTypes from 'prop-types';

class Stage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Image
          id="onlycoin"
          size="mini"
          src={iconImage}
          style={{ width: '4vw' }}
        />
        <span className="status-title">X {this.props.stage}</span>
      </React.Fragment>
    );
  }
}

Stage.propTypes = {
  stage: PropTypes.number.isRequired
};

export default Stage;
