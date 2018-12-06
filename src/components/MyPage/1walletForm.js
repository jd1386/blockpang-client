import React, { Component } from 'react';
import { Input, Label } from 'semantic-ui-react';
import WalletInfo from './WalletInfo';
import util from '../../util';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // finishedEditing: false,
      walletAddress: this.props.walletAddress,
      enteredWalletAddress: '',
      isValidWalletAddress: false
    };
  }

  _validateWallet(address) {
    const isValidLength = address.length === 42;
    const isValidStart = address[0] + address[1] === 'hx' || 'cx';

    if (isValidLength && isValidStart) {
      this.setState({ isValidWalletAddress: true });
      return true;
    } else {
      this.setState({ isValidWalletAddress: false });
      return false;
    }
  }

  _handleOnClick(newAddress) {
    if (this._validateWallet(newAddress)) {
      this.props.handleEditWallet();
      this.props.updateWalletAddress(newAddress);
      this.setState({
        finishedEditing: true,
        isValidWalletAddress: true
      });

      util.setWalletAddress(newAddress);
    }
  }

  _alertValidWallet() {
    return (
      <Label basic size="large" color="green" pointing>
        Valid wallet address!
      </Label>
    );
  }

  _alertInvalidWallet() {
    if (this.state.enteredWalletAddress) {
      return (
        <Label basic size="large" color="red" pointing>
          Invalid wallet address!
        </Label>
      );
    }
  }

  render() {
    return this.state.walletAddress ? (
      <WalletInfo
        walletAddress={this.state.walletAddress}
        handleEditWallet={() => this.setState({ walletAddress: '' })}
      />
    ) : (
      <div>
        <Input
          size="tiny"
          style={{ width: '90%', color: 'teal' }}
          icon="chain"
          iconPosition="left"
          focus
          placeholder="Enter your wallet address"
          onChange={(e, data) => {
            this.setState({ enteredWalletAddress: data.value });
            this._validateWallet(data.value);
          }}
          action={{
            color: 'teal',
            content: 'Submit',
            onClick: () => this._handleOnClick(this.state.enteredWalletAddress)
          }}
        />

        {this.state.isValidWalletAddress
          ? this._alertValidWallet()
          : this._alertInvalidWallet()}
      </div>
    );
  }
}

export default WalletForm;
