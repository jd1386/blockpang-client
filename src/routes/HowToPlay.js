import React, { Component } from 'react';
import { Divider, Segment, Button, Grid, Container } from 'semantic-ui-react';
import '../components/HowToPlay/style.scss';

class HowToPlay extends Component {
  state = {
    languageSelected: 'ko'
  };

  _handleOnClick() {
    this.state.languageSelected === 'ko'
      ? this.setState({ languageSelected: 'en' })
      : this.setState({ languageSelected: 'ko' });
  }

  _renderInstruction(language = 'ko') {
    // eslint-disable-next-line default-case
    switch (this.state.languageSelected) {
      case 'ko':
        return (
          <Container style={{ padding: '5.5em 0em' }}>
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
                            블록 고유의 키보드 키를 누르면 블록이 파괴됩니다.
                          </li>
                          <li>블록이 파괴될 때마다 게임 점수를 얻게 됩니다.</li>
                          <li>키를 잘못 누르면 게임은 즉시 종료됩니다.</li>
                          <li>
                            매 게임이 끝난 직후 게임 점수가 ICX로 변환되어
                            당신의 지갑에 송금됩니다.
                          </li>

                          <Divider />

                          <li>Q 블럭이 파괴되면 모든 블럭을 파괴합니다.</li>
                          <li>
                            보너스 블럭이 파괴될 때마다 추가 점수를 얻을 수
                            있습니다.
                          </li>
                          <li>
                            멀티키 블록이 나타나면 순서대로 정해진 키를 눌러야
                            합니다.
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
          <Container style={{ padding: '5.5em 0em' }}>
            <Segment vertical>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <div className="game-instruction ko">
                    <div className="header">How to Play BlockPang</div>
                    <div className="toggle-button-container">
                      <Button onClick={() => this._handleOnClick()}>
                        Switch to English
                      </Button>
                    </div>
                    <Segment>
                      <div>
                        <ul>
                          <li>
                            Each block has a unique keyboard key to press.
                          </li>
                          <li>
                            As you hit the key of the block in the bottom, the
                            block will be destroyed and you get points.
                          </li>
                          <li>When wrong key gets pressed, the game ends.</li>
                          <li>
                            In a few seconds after each game, your score gets
                            converted to ICX and it will be transfered to your
                            wallet.
                          </li>

                          <Divider />

                          <li>
                            When the Q block gets destroyed, it clears all other
                            blocks.
                          </li>
                          <li>
                            When the bonus blocks get cleared, you get extra
                            points.
                          </li>
                          <li>
                            You need to press the keys in a row to clear
                            multi-key blocks.
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
