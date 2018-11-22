import React from 'react';
import './style.scss';

const blockContent = props => {
  const { bonusScore, image, keyDown } = props.data;
  let bonusText = null;

  bonusScore
    ? (bonusText = <span className="bonus-text">Bonus {bonusScore}</span>)
    : (bonusText = null);

  return (
    <React.Fragment>
      <div>{image}</div>
      <div className="inner-text">
        <div>{keyDown}</div>
        <div className="bonus-text">{bonusText}</div>
      </div>
      <div>{image}</div>
    </React.Fragment>
  );
};

export default blockContent;
