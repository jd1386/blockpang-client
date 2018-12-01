import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class WalletInfo extends Component {
  render() {
    return (
      <div>
        Your wallet address: {this.props.walletAddress}
        <Button
          onClick={() => {
            console.log('clicked');
            this.props.handleEditWallet();
          }}
          style={{
            backgroundColor: '#1aaaba',
            color: '#FFFFFF',
            float: 'right'
          }}
        >
          Edit Wallet
        </Button>
      </div>
    );
  }
}

export default WalletInfo;
