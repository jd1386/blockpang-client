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

class Settings extends Component {
  state = {
    amountLimit: null,
    blockLimit: null,
    adminEmail: null,
    scoreAddress: null,
    currentBalance: null,
    openModal: false
  };

  _openModal() {
    this.setState({ openModal: true });
    console.log('modal open');
  }

  _closeModal() {
    this.setState({ openModal: false });
    console.log('modal closed');
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
              this.setState({ enteredWalletAddress: data.value });
              this._validateWallet(data.value);
            }}
            action={{
              color: 'teal',
              content: 'Submit'
              // onClick: () =>
              //   this._handleOnClick(this.state.enteredWalletAddress)
            }}
          />
        </Modal.Content>
        <Modal.Actions />
      </Modal>
    );
  }

  componentDidMount() {
    // TODO: authentication
    // get_limit
    axios.get('http://54.180.114.119:8000/admin/get_limit').then(res => {
      console.log(res.data);
      this.setState({
        amountLimit: res.data.amountlimit,
        blockLimit: res.data.blocklimit,
        adminEmail: res.data.admin_email
      });
    });

    // current_balance
    axios.get('http://54.180.114.119:8000/admin/current_balance').then(res => {
      console.log(res.data);
      this.setState({
        scoreAddress: res.data.default_score,
        currentBalance: res.data.current_balance
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
                          <Button onClick={() => this._openModal()}>
                            Edit
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Block Limit</Table.Cell>
                        <Table.Cell>{this.state.blockLimit}</Table.Cell>
                        <Table.Cell>
                          <Button onClick={() => this._openModal()}>
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
                    Email: {this.state.adminEmail || 'someadminemail@gmail.com'}{' '}
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
