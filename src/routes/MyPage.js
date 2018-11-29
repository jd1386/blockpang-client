import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Tab,
  Input
  // Label
} from 'semantic-ui-react';
import './MyPage.scss';

const displayForm = walletAddress => {
  return (
    <div>
      <Input
        size="tiny"
        style={{ minWidth: '35em' }}
        icon="teal chain"
        iconPosition="left"
        action={{
          // style={{ color: 'FFFFFF' }},
          color: 'teal',
          content: 'Edit'
        }}
        defaultValue={walletAddress}
      />
    </div>
  );
};

const handleRegisterWallet = () => {
  console.log('hi');
};

const getDefaultState = () => {
  const walletAddress = localStorage.getItem('walletAddress');
  // const walletAddress = 'hxc4193cda4a75526bf50896ec242d6713bb6b02a3';

  const panes = [
    {
      menuItem: 'Manage Wallet',
      render: () => (
        <Tab.Pane attached={false}>
          <div>
            <Input
              size="tiny"
              style={{ minWidth: '35em', color: 'teal' }}
              icon="chain"
              iconPosition="left"
              action={{
                color: 'teal',
                content: 'Register Wallet',
                onClick: () => handleRegisterWallet()
              }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <Button
              onClick={() => alert('hi')}
              style={{ backgroundColor: '#1aaaba', color: '#FFFFFF' }}
            >
              Create Wallet
            </Button>
          </div>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Game History',
      render: () => (
        <Tab.Pane attached={false}>
          게임기록이 아직 없습니다. 한 게임 해보시는 건 어떨까요?
        </Tab.Pane>
      )
    }
  ];

  if (walletAddress) {
    panes.shift();
    panes.unshift({
      menuItem: 'Manage Wallet',
      render: () => (
        <Tab.Pane attached={false}>
          Your Wallet Address{' '}
          {/* <Input focus placeholder="hxc4193cda4a75526bf50896ec242d6713bb6b02a3" /> */}
          <Input
            size="tiny"
            style={{ minWidth: '35em', color: 'teal' }}
            icon="chain"
            iconPosition="left"
            action={{
              color: 'teal',
              content: 'Edit'
            }}
            defaultValue={walletAddress}
          />
          {/* <Label>{walletAddress}</Label> */}
          {/* <Button>Wallet Change</Button> */}
          {/* <i class="icon user" /> */}
        </Tab.Pane>
      )
    });
  }
  return {
    walletAddress,
    panes
  };
};

// const walletAddress = 'hxc4193cda4a75526bf50896ec242d6713bb6b02a3';

class MyPage extends Component {
  state = getDefaultState();

  render() {
    // FIXME: fix the following auth logic below
    // if (!this.props.isLoggedIn) {
    if (!localStorage.getItem('userData')) {
      return <Redirect to={'/'} />;
    }

    return (
      <Container>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Header as="h1">My Page</Header>
            </Grid.Row>
            <Grid.Row>
              <div>
                <Tab
                  menu={{
                    id: 'onlytab',
                    inverted: true,
                    attached: false,
                    tabular: false
                  }}
                  panes={this.state.panes}
                />
              </div>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default MyPage;
