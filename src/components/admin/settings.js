import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Table,
  Modal,
  Input
} from 'semantic-ui-react';
import axios from 'axios';
import util from '../../util';

class Settings extends Component {
  state = {
    amountLimit: null,
    blockLimit: null,
    adminEmail: null,
    scoreAddress: null,
    currentBalance: null,
    enteredInputValue: '',
    openModal: false,
    modalType: ''
  };

  _openModal(modalType) {
    this.setState({
      openModal: true,
      modalType
    });
  }

  _closeModal() {
    this.setState({ openModal: false, modalType: '', enteredInputValue: '' });
  }

  _handleOnSubmit() {
    // eslint-disable-next-line default-case
    switch (this.state.modalType) {
      case 'resetAmountLimit':
        // API call to reset amount limit
        axios
          .post(util.API_URLS['admin_set_limit'], {
            amount_limit: this.state.enteredInputValue,
            block_limit: this.state.blockLimit
          })
          .then(res => {
            // setState so that the page re-renders
            this.setState({
              amountLimit: res.data.amountlimit,
              blockLimit: res.data.blocklimit,
              openModal: false
            });
          })
          .catch(err => {
            throw err;
          });
        break;

      case 'resetBlockLimit':
        // API call to reset block limit
        axios
          .post(util.API_URLS['admin_set_limit'], {
            amount_limit: this.state.amountLimit,
            block_limit: this.state.enteredInputValue
          })
          .then(res => {
            // setState so that the page re-renders
            this.setState({
              amountLimit: res.data.amountlimit,
              blockLimit: res.data.blocklimit,
              openModal: false
            });
          })
          .catch(err => {
            throw err;
          });
        break;
    }
  }

  _modalContent() {
    return (
      <Modal
        size="tiny"
        open={this.state.openModal}
        onClose={() => this._closeModal()}
      >
        <Modal.Header>Reset settings</Modal.Header>
        <Modal.Content>
          <Input
            size="tiny"
            style={{ width: '90%', color: 'teal' }}
            icon="chain"
            iconPosition="left"
            focus
            placeholder="Enter new value"
            onChange={(e, data) => {
              this.setState({ enteredInputValue: data.value });
            }}
            action={{
              color: 'teal',
              content: 'Submit',
              onClick: () => this._handleOnSubmit()
            }}
          />
        </Modal.Content>
        <Modal.Actions />
      </Modal>
    );
  }

  componentDidMount() {
    // TODO: authentication
    // admin_summary

    axios.get(util.API_URLS['admin_summary']).then(res => {
      this.setState({
        adminEmail: res.data.admin_email,
        scoreAddress: res.data.score_address,
        currentBalance: res.data.current_balance
      });
    });

    // set_limit
    axios.get(util.API_URLS['admin_get_limit']).then(res => {
      this.setState({
        amountLimit: res.data.amountlimit,
        blockLimit: res.data.blocklimit
      });
    });
  }

  render() {
    return (
      <Container>
        <Segment vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Header as="h1">Settings</Header>
            </Grid.Row>
          </Grid>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h2">Payout Settings</Header>
                  <Table
                    basic="very"
                    celled
                    collapsing
                    style={{ width: '100%' }}
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Current Setting</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Amount Limit</Table.Cell>
                        <Table.Cell>{this.state.amountLimit}</Table.Cell>
                        <Table.Cell>
                          <Button
                            onClick={() => this._openModal('resetAmountLimit')}
                          >
                            Edit
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Block Limit</Table.Cell>
                        <Table.Cell>{this.state.blockLimit}</Table.Cell>
                        <Table.Cell>
                          <Button
                            onClick={() => this._openModal('resetBlockLimit')}
                          >
                            Edit
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as="h2">Faucet Information</Header>
                  <div>Score: {this.state.scoreAddress} </div>
                  <div>Balance: {this.state.currentBalance}</div>
                </Segment>
                <Segment>
                  <Header as="h2">Current Admin</Header>
                  <div>
                    Email: {this.state.adminEmail || 'someadminemail@gmail.com'}
                    <Button
                      size="tiny"
                      onClick={() => this._openModal('resetBlockLimit')}
                    >
                      Edit
                    </Button>
                  </div>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {this._modalContent()}
      </Container>
    );
  }
}

export default Settings;
