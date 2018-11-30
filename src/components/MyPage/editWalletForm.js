import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import WalletInfo from './walletInfo';

class EditWalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedEditing: false,
      enteredWalletAddress: ''
    };
  }

  _handleOnClick(value) {
    console.log(value);
    this.setState({ finishedEditing: true });
    this.props.handleEditWallet();
    this.props.updateWalletAddress(value);
  }

  render() {
    return this.state.finishedEditing ? (
      <WalletInfo
        walletAddress={this.props.walletAddress}
        handleEditWallet={this.props.handleEditWallet}
      />
    ) : (
      <div>
        <h3>Enter your new wallet address</h3>
        <Input
          size="tiny"
          style={{ width: '100%', color: 'teal' }}
          icon="chain"
          iconPosition="left"
          onChange={(e, data) =>
            this.setState({ enteredWalletAddress: data.value })
          }
          action={{
            color: 'teal',
            content: 'Edit Wallet',
            onClick: () => this._handleOnClick(this.state.enteredWalletAddress)
          }}
        />
      </div>
    );
  }
}

export default EditWalletForm;
