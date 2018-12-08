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
import '../components/MyPage/style.scss';
import WalletInfo from '../components/MyPage/WalletInfo';
import WalletForm from '../components/MyPage/WalletForm';
import GameRecord from '../components/MyPage/GameRecord';
import Modal from '../components/MyPage/Modal';
import axios from 'axios';
import util from '../util';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: util.walletAddress(),
      walletBalance: '',
      walletKey: '',
      activeMenu: 'Manage Wallet',
      isEditingWallet: false,
      isWalletCreated: false
    };
  }

  _handleModalClose() {
    this.setState({ isWalletCreated: false });
  }

  _handleCancelEditWallet() {
    this.setState({ isEditingWallet: false });
  }

  _toggleModal() {
    return this.state.isWalletCreated ? (
      <React.Fragment>
        <WalletInfo
          walletAddress={this.state.walletAddress}
          walletBalance={this.state.walletBalance}
          handleEditWallet={() => this._handleEditWallet()}
        />
        <Modal
          walletAddress={this.state.walletAddress}
          walletKey={this.state.walletKey}
          onClose={() => this._handleModalClose()}
        />
      </React.Fragment>
    ) : (
      <WalletInfo
        walletAddress={this.state.walletAddress}
        walletBalance={this.state.walletBalance}
        handleEditWallet={() => this._handleEditWallet()}
      />
    );
  }

  _manageWalletContent() {
    return this.state.walletAddress ? (
      <div>
        {this.state.isEditingWallet ? (
          <WalletForm
            handleEditWallet={() => this._handleEditWallet()}
            updateWalletAddress={arg => this._updateWalletAddress(arg)}
            cancelEditWallet={() => this._handleCancelEditWallet()}
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

  _handleEditWallet() {
    this.setState(prevState => ({
      isEditingWallet: true
    }));
  }

  _handleCreateWallet() {
    // get user data from localStorage for API use
    const {
      email,
      provider,
      provider_id,
      provider_pic,
      name
    } = util.userData();
    const reqBody = {
      email,
      profile_img_url: provider_pic,
      nickname: name,
      service_provider: provider,
      user_pid: provider_id
    };

    // API call to create a new wallet
    axios
      .post(util.API_URLS['create_wallet'], JSON.stringify(reqBody))
      .then(res => {
        // save address to localStorage
        util.setWalletAddress(res.data.address);

        // setState so it renders a modal
        this.setState({
          isWalletCreated: true,
          walletAddress: res.data.address,
          walletKey: res.data.key
        });

        // if previousGameScore, transfer coin
        util.transferPreviousScore();
      })
      .catch(err => {
        throw err;
      });
  }

  _updateWalletAddress(newAddress) {
    // get user data from localStorage for API use
    const {
      email,
      provider,
      provider_id,
      provider_pic,
      name
    } = util.userData();
    const reqBody = {
      email,
      profile_img_url: provider_pic,
      nickname: name,
      service_provider: provider,
      user_pid: provider_id,
      wallet: newAddress
    };

    // call update API
    axios
      .post(util.API_URLS['update_wallet'], JSON.stringify(reqBody))
      .then(res => {
        this.setState({ walletAddress: newAddress });
        util.setWalletAddress(newAddress);
        util.transferPreviousScore();
      })
      .catch(err => {
        throw err;
      });
  }

  async componentDidMount() {
    if (!this.state.walletAddress) {
      const userFromDB = await axios
        .get(util.API_URLS['totaluser'])
        .then(res => {
          return res.data.find(user => {
            return user.email === util.userData().email;
          });
        });

      if (userFromDB && userFromDB.wallet) {
        this.setState({ walletAddress: userFromDB.wallet });
        util.setWalletAddress(userFromDB.wallet);
      }
    } else {
      const { data } = await axios.post(util.API_URLS['wallet_balance'], {
        wallet: this.state.walletAddress
      });

      this.setState({ walletBalance: data.wallet_balance });
    }
  }

  render() {
    const { activeMenu } = this.state;

    if (!this.props.isLoggedIn) {
      if (!util.isLoggedIn()) {
        return <Redirect to={'/'} />;
      }
    }

    return (
      <Container style={{ paddingTop: '5em' }}>
        <Segment vertical>
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
                  name="Transfer Records"
                  active={activeMenu === 'Transfer Records'}
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
