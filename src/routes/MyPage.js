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
import './MyPage.css';

const getDefaultState = () => {
  let walletAddress;
  walletAddress = window.localStorage.getItem('walletAddress');
  const panes = [
    {
      menuItem: '지갑 등록',
      render: () => (
        <Tab.Pane attached={false}>
          아직 등록된 지갑이 없군요!
          <p />
          <Button style={{ backgroundColor: '#1aaaba', color: '#FFFFFF' }}>
            지갑 생성
          </Button>
          <Button style={{ backgroundColor: '#1aaaba', color: '#FFFFFF' }}>
            기존 지갑 등록
          </Button>
        </Tab.Pane>
      )
    },
    {
      menuItem: '게임 기록',
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
      menuItem: '지갑 정보',
      render: () => (
        <Tab.Pane attached={false}>
          Your Wallet :{' '}
          {/* <Input focus placeholder="hxc4193cda4a75526bf50896ec242d6713bb6b02a3" /> */}
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
    if (!this.props.isLoggedIn || !localStorage.getItem('userData')) {
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
