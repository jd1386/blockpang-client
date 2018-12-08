import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class WalletInfo extends Component {
  render() {
    return (
      <div>
        <div>
          Your wallet address: <b>{this.props.walletAddress}</b>
          <Button
            onClick={this.props.handleEditWallet}
            style={{
              backgroundColor: '#1aaaba',
              color: '#FFFFFF',
              float: 'right'
            }}
          >
            Edit Wallet
          </Button>
        </div>
        <div>
          Your wallet balance: <b>{this.props.walletBalance} ICX</b>
        </div>
      </div>
    );
  }
}

export default WalletInfo;
