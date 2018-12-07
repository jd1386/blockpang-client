import React, { Component } from 'react';
import { Segment, Button, Grid, Container } from 'semantic-ui-react';
import '../components/HowToPlay/style.scss';

class HowToPlay extends Component {
  state = {
    languageSelected: 'en'
  };

  _handleOnClick() {
    this.state.languageSelected === 'ko'
      ? this.setState({ languageSelected: 'en' })
      : this.setState({ languageSelected: 'ko' });
  }

  _renderInstruction() {
    // eslint-disable-next-line default-case
    switch (this.state.languageSelected) {
      case 'ko':
        return (
          <Container style={{ paddingTop: '5em' }}>
            <Segment vertical>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <div className="game-instruction ko">
                    <div className="header">블록팡 플레이 방법</div>
                    <div className="toggle-button-container">
                      <Button onClick={() => this._handleOnClick()}>
                        Switch to English
                      </Button>
                    </div>
                    <Segment>
                      <div>
                        <ul>
                          <li>
                            블록에 표시된 알파벳 키를 누르면 블록이 파괴되고
                            점수를 얻습니다.
                          </li>
                          <li>키를 잘못 누르면 게임은 즉시 종료됩니다.</li>
                          <li>
                            게임이 끝난 직후 게임 점수가 ICX로 변환되어 당신의
                            지갑에 전송됩니다.
                          </li>
                          <li>행운을 빌며 살아남길 고대합니다.</li>
                        </ul>
                      </div>
                    </Segment>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Segment>
          </Container>
        );
      case 'en':
        return (
          <Container style={{ paddingTop: '5em' }}>
            <Segment vertical>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <div className="game-instruction ko">
                    <div className="header">How to Play BlockPang</div>
                    <div className="toggle-button-container">
                      <Button onClick={() => this._handleOnClick()}>
                        한국어로 보기
                      </Button>
                    </div>
                    <Segment>
                      <div>
                        <ul>
                          <li>
                            Hit the key of each block, and it will be destroyed
                            and you earn points.
                          </li>
                          <li>When wrong key gets pressed, the game ends.</li>
                          <li>
                            After each game, ICX will be transfered to your
                            wallet.
                          </li>
                          <li>Good luck and stay alive.</li>
                        </ul>
                      </div>
                    </Segment>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Segment>
          </Container>
        );
    }
  }

  render() {
    return this._renderInstruction();
  }
}

export default HowToPlay;
