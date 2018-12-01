import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Divider,
  Menu,
  Table
} from 'semantic-ui-react';
import './MyPage.scss';
import WalletInfo from '../components/MyPage/walletInfo';
import WalletForm from '../components/MyPage/walletForm';
import Modal from '../components/MyPage/modal';
import axios from 'axios';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: '',
      walletKey: '',
      // walletAddress: 'hxc4193cda4a75526bf50896ec242d6713bb6b02a3',
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
      <React.Fragment>
        <WalletInfo
          walletAddress={this.state.walletAddress}
          handleEditWallet={() => this._handleEditWallet()}
        />
      </React.Fragment>
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

  _gameRecordContent() {
    return (
      <Table basic="very" celled collapsing style={{ width: '100%' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
            <Table.HeaderCell>ICX won</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  _handleMenuClick = (e, { name }) => this.setState({ activeMenu: name });

  _handleRegisterWallet() {
    console.log('clicked handleRegisterWallet');
  }

  _handleCreateWallet() {
    console.log('clicked handleCreateWallet');
    // call API request for createWallet
    // if returned set it to localStorage
    // req body
    // {'email':'k@i.com', 'service_provider':'google', 'user_pid':'109268495254631984078'}
    // res
    //  {"address": "hxf93bdeb0a2e7ccc19e217d427c084f8bf98e67df", "key": "52df7adc707cf555f75534414c56a753a34e89bafeacca9b9582939d15dde93f"}
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { email, provider, provider_id } = userData;
    const reqBody = {
      email,
      service_provider: provider,
      user_pid: provider_id
    };

    // console.log(JSON.stringify(reqBody));

    axios
      .post('http://54.180.114.119:8000/wallet/create', JSON.stringify(reqBody))
      .then(res => {
        console.log(res);
        // {'address': 'hxdbc6b65ce1f0753be17487b992bc814bbea4c9e4', 'key': '62b263d4bcdf6522fad757780d1c4937a4d466cd82fc6756b15035fd6a0a3e73'}
        // let data = JSON.parse(res.data);
        // console.log(data);
        // save address to localStorage
        // localStorage.setItem('walletAddress', res.data.address);

        // setState so it renders a modal
        this.setState({
          isWalletCreated: true,
          walletAddress: '12345',
          walletKey: 'asdf'
        });
      })
      .catch(err => {
        throw err;
      });

    // save wallet address to localStorage
  }

  _handleEditWallet() {
    this.setState(prevState => ({
      isEditingWallet: !prevState.isEditingWallet
    }));
  }
  _updateWalletAddress(newAddress) {
    this.setState({ walletAddress: newAddress });
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
                {activeMenu === 'Manage Wallet'
                  ? this._manageWalletContent()
                  : this._gameRecordContent()}
              </Segment>
            </Grid.Row>
            {/* {this.state.isWalletCreated ? (
              <Modal walletAddress={'dslkjsdf'} walletKey={'1209'} />
            ) : null} */}
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default MyPage;
