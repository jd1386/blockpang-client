import React, { Component } from 'react';
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

const wallet = true;
const walletAddress = 'hxc4193cda4a75526bf50896ec242d6713bb6b02a3';

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
        게임에서 테스트 ICX를 1300 받아가셨습니다!
      </Tab.Pane>
    )
  }
];

if (wallet) {
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

class MyPage extends Component {
  render() {
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
                  panes={panes}
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
