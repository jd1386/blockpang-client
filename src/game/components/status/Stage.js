import React from 'react';
import PropTypes from 'prop-types';

class Stage extends React.PureComponent {
  render() {
    return <span className="status-title">Stage {this.props.stage}</span>;
  }
}

Stage.propTypes = {
  stage: PropTypes.number.isRequired
};

export default Stage;
