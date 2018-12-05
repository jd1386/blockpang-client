import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import clockImage from '../../assets/img/clock.gif';

const formatUnitOfTime = unitOfTime => {
  return unitOfTime < 10
    ? `0${unitOfTime}`.substring(0, 2)
    : unitOfTime.toString().substring(0, 2);
};

const displayTime = time => {
  const seconds = formatUnitOfTime(Math.floor(time / 1000));
  const milliseconds = formatUnitOfTime(time % 1000);
  return `${seconds}:${milliseconds}`;
};

const timer = props => (
  <React.Fragment>
    <Image id="onlycoin" size="mini" src={clockImage} />
    <span className="status-title">{displayTime(props.time)}</span>
  </React.Fragment>
);

timer.propTypes = {
  time: PropTypes.number.isRequired
};

export default timer;
