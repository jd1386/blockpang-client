import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Divider,
  Menu
} from 'semantic-ui-react';
import './MyPage.scss';
import WalletInfo from '../components/MyPage/walletInfo';
import WalletForm from '../components/MyPage/walletForm';
import GameRecord from '../components/MyPage/gameRecord';
import Modal from '../components/MyPage/modal';
import axios from 'axios';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: '',
      walletKey: '',
      activeMenu: 'Manage Wallet',
      isEditingWallet: false,
      isWalletCreated: false
    };
  }

  _toggleModal() {
    return this.state.isWalletCreated ? (
      <React.Fragment>
        <WalletInfo
          walletAddress={this.state.walletAddress}
          handleEditWallet={() => this._handleEditWallet()}
        />
        <Modal
          walletAddress={this.state.walletAddress}
          walletKey={this.state.walletKey}
        />
      </React.Fragment>
    ) : (
      <WalletInfo
        walletAddress={this.state.walletAddress}
        handleEditWallet={() => this._handleEditWallet()}
      />
    );
  }

  _manageWalletContent() {
    return this.state.walletAddress ? (
      <div>
        {this.state.isEditingWallet ? (
          <WalletForm
            walletAddress={this.state.walletAddress}
            handleEditWallet={() => this._handleEditWallet()}
            updateWalletAddress={arg => this._updateWalletAddress(arg)}
          />
        ) : (
          this._toggleModal()
        )}
      </div>
    ) : (
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header>Already have a wallet?</Header>
              <WalletForm
                walletAddress={this.state.walletAddress}
                handleEditWallet={() => this._handleEditWallet()}
                updateWalletAddress={arg => this._updateWalletAddress(arg)}
              />
            </Grid.Column>

            <Grid.Column>
              <Header>Don't have a wallet yet?</Header>
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <Button positive onClick={() => this._handleCreateWallet()}>
                  Create Wallet
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }

  _handleMenuClick = (e, { name }) => this.setState({ activeMenu: name });

  _handleCreateWallet() {
    // get user data from localStorage for API use
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { email, provider, provider_id } = userData;
    const reqBody = {
      email,
      service_provider: provider,
      user_pid: provider_id
    };

    // API call to create a new wallet
    axios
      .post('http://54.180.114.119:8000/wallet/create', JSON.stringify(reqBody))
      .then(res => {
        // save address to localStorage
        localStorage.setItem('walletAddress', res.data.address);

        // setState so it renders a modal
        this.setState({
          isWalletCreated: true,
          walletAddress: res.data.address,
          walletKey: res.data.key
        });
      })
      .catch(err => {
        throw err;
      });
  }

  _handleEditWallet() {
    console.log('handleEditWallet called');
    console.log('before', this.state.isEditingWallet);
    this.setState(prevState => ({
      isEditingWallet: !prevState.isEditingWallet
    }));
  }
  _updateWalletAddress(newAddress) {
    // get user data from localStorage for API use
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { email, provider, provider_id } = userData;
    const reqBody = {
      email,
      service_provider: provider,
      user_pid: provider_id,
      wallet: newAddress
    };

    // call update API
    axios
      .post('http://54.180.114.119:8000/wallet/update', JSON.stringify(reqBody))
      .then(res => {
        this.setState({ walletAddress: newAddress });
        localStorage.setItem('walletAddress', newAddress);
      })
      .catch(err => {
        throw err;
      });
  }

  componentDidMount() {
    this.setState({ walletAddress: localStorage.getItem('walletAddress') });
  }

  render() {
    const { activeMenu } = this.state;

    // FIXME: fix the following auth logic below
    if (!this.props.isLoggedIn) {
      if (!localStorage.getItem('userData')) {
        return <Redirect to={'/'} />;
      }
    }

    return (
      <Container>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Header as="h1">My Page</Header>
            </Grid.Row>
            <Grid.Row>
              <Menu attached="top" tabular>
                <Menu.Item
                  name="Manage Wallet"
                  active={activeMenu === 'Manage Wallet'}
                  onClick={this._handleMenuClick}
                />
                <Menu.Item
                  name="Game Record"
                  active={activeMenu === 'Game Record'}
                  onClick={this._handleMenuClick}
                />
              </Menu>

              <Segment attached="bottom">
                {activeMenu === 'Manage Wallet' ? (
                  this._manageWalletContent()
                ) : (
                  <GameRecord />
                )}
              </Segment>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default MyPage;
