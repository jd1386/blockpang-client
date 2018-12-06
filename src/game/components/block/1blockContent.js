import React from 'react';
import './style.scss';

const BlockContent = props => {
  const { bonusScore, image, keyDown, health } = props.data;
  let bonusText = null;
  let healthText = null;

  bonusScore
    ? (bonusText = <span className="bonus-text">Bonus {bonusScore}</span>)
    : (bonusText = null);

  health
    ? (healthText = <span className="bonus-text">health {health}</span>)
    : (healthText = null);

  return (
    <React.Fragment>
      <div>{image}</div>
      <div className="inner-text">
        <div>{keyDown}</div>
        <div className="bonus-text">{bonusText}</div>
        <div>{healthText}</div>
      </div>
      <div>{image}</div>
    </React.Fragment>
  );
};

export default BlockContent;
