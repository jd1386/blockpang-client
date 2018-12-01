import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class modal extends Component {
  state = { modalOpen: true };

  // handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        // trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header
          icon="browser"
          content="Your wallet has been successfully created!"
        />
        <Modal.Content>
          <h3>Please keep the following wallet key secure. </h3>
          <ul>
            <li>
              <h4>Wallet Address: {this.props.walletAddress}</h4>
            </li>
            <li>
              <h4>Wallet Key: {this.props.walletKey}</h4>
            </li>
          </ul>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default modal;
