import React from 'react';
import './style.scss';

const walletMissing = () => {
  return (
    <div className="game-status-main">
      <div className="header">
        Block
        <br /> Pang
      </div>
      <div className="content">
        <div style={{ fontSize: '0.8em' }}>
          Please register your wallet on my page
        </div>
      </div>
    </div>
  );
};

export default walletMissing;
