import React from 'react';
import './App.scss';
import { random } from 'lodash';
// import { Spring, Transition } from 'react-spring';
import { VelocityComponent } from 'velocity-react';
import Block from './components/block';
import Status from './components/status';
import { Image } from 'semantic-ui-react';
import Util from './utils';
import config from './config';

const defaultState = {
  time: config.time,
  nextBlockTime: config.nextBlockTime,
  score: config.score,
  blocks: [],
  isFirstPlaying: true,
  isPlaying: false,
  gameoverReason: ''
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.gameBoardBackground = Util.generateRandBackground();
    this.state = defaultState;
  }

  _checkAllowedKeycodes(e) {
    if (config.allowedKeyCodes.includes(e.keyCode)) {
      e.preventDefault();
      return true;
    }
  }

  _tick = () => {
    if (this.state.gameoverReason) return;

    if (this.state.isPlaying) {
      this.state.time > 0
        ? this.setState(prevState => ({
            time: prevState.time - 10
            // time: prevState.time - 1
          }))
        : this.setState(prevState => ({
            time: 0
          }));
    }
    if (this.state.time <= 0) this.setState({ gameoverReason: 'timeover' });
  };

  _handleKeyDown = e => {
    let isStart;
    console.log('입력키 ', e.key, '키코드', e.keyCode);

    if (!this.state.isPlaying) {
      isStart = true;
      this.setState({ isPlaying: true });
    }

    if (this._checkAllowedKeycodes(e)) return;

    if (this.state.blocks.length === 0) return;

    let currentBlocks = this.state.blocks.slice();

    // console.log('현재 입력해야 할 블럭 키', currentBlocks[0].key[0]);
    // console.log('입력키', e.key.toLowerCase());
    // console.log('체력', currentBlocks[0].health);
    // console.log('현재 블록상태', this.state.blocks);

    // if (e.key.toLowerCase() === currentBlocks[0].key) { // 기존 입력할 키가 단 하나였을 경우
    if (e.key.toLowerCase() === currentBlocks[0].key[0]) {
      // key 값이 일치하면, currentBlocks 배열의 블럭 데이터를 삭제한다.
      if (
        currentBlocks[0].key.length === 1 &&
        (currentBlocks[0].health === 1 || !currentBlocks[0].health)
      ) {
        // 블럭 파괴 키가 1개 뿐이고, 블럭 health prop이 1이거나 없을 경우
        let keepBonusScore = currentBlocks[0].bonusScore;
        currentBlocks.shift();
        this.setState({ blocks: currentBlocks });

        // 점수를 업데이트한다
        this._updateScore();
        // 보너스 점수를 추가한다
        if (keepBonusScore) {
          this._updateEventBlockScore(keepBonusScore);
        }

        // 약간의 시간 간격을 두고 새로운 블럭을 스택 상단에 쌓는다
        // TODO: 기본 기능만 구현한 것.
        // 현재는 매 일정 시간 간격으로 블럭이 자동 생성되도록 로직이 바뀌어
        // 아래 파트는 주석처리.

        // setTimeout(() => {
        //   let newBlock = this._generateRandomBlock();
        //   console.log('new block generated!', newBlock);

        //   this.setState({
        //     blocks: [...this.state.blocks, newBlock]
        //   });
        // }, 350);
      } else if (currentBlocks[0].key.length > 1) {
        // 멀티 키를 가진 블럭의 경우
        let [firstBlock, ...otherBlocks] = this.state.blocks;
        if (firstBlock.key.length > 1) firstBlock.key.shift();

        this.setState({
          blocks: [firstBlock, ...otherBlocks]
        });
      } else if (currentBlocks[0].health) {
        // 체력을 가진 블럭의 경우, 체력을 가진 경우는 키를 여러번 입력해야 파괴됨.
        // TODO: 멀티 키와 체력을 동시에 가진 블럭의 처리는 아직 고려 안함.
        let [firstBlock, ...otherBlocks] = this.state.blocks;
        if (firstBlock.health > 1) firstBlock.health -= 1;

        this.setState({
          blocks: [firstBlock, ...otherBlocks]
        });
      }
    } else if (!isStart) {
      // 시작하자마자 버튼 잘못 눌러서 사망하는 상황 방지. 첫 입력 미스는 막아줌.
      this._endGame('missInput');
    }
  };

  _generateRandomBlock() {
    let randomIndex = random(config.block.colors.length - 1);
    let randomKeyIndex;
    let randomColor;
    // let blockImage;
    let keySet = config.block.keys[randomIndex]; //normalStageKeySet

    if (this.state.score > 1500 && random(7) === 0) {
      // 1500 점을 넘는 경우 멀티 키를 가진 블럭 출현
      // TODO: 현재 확정되지 않은 스테이지 개념. 보완 필요.
      keySet = config.stage[0].multiBlockKeys[randomIndex].slice();
    }

    if (
      this.state.isPlaying &&
      random(100) + 1 <= config.randomBlockProbability // 랜덤컬러 블럭 출현 파트
    ) {
      randomColor = random(1) === 1 ? '#1aaaba' : `${Util.getRandColor(4)}`;
      // 랜덤 블럭 출현이 확정면면 다시 50% 확률로 ICON 블럭 혹은 랜덤 컬러 블럭이 출현

      randomKeyIndex = random(config.eventBlock.keys.length - 1);
      return {
        // 랜덤 블럭
        blockImage:
          randomColor === '#1aaaba' ? ( // ICON COLOR 인 경우
            <Image size="mini" src="favicon.ico" />
          ) : (
            <Image size="mini" src="coin.gif" id="block-image" />
          ),
        color: randomColor,
        key: config.eventBlock.keys[randomKeyIndex].slice(),
        bonusScore: randomColor === '#1aaaba' ? random(50) + 50 : random(30)
      };
    }

    return {
      // 베이직 블럭
      color: config.block.colors[randomIndex],
      key: keySet
    };
  }

  _generateDefaultBlocks(numOfBlocks = 6) {
    // generate an array of random blocks
    let randomBlocks = [];

    for (let i = 0; i < numOfBlocks; i++) {
      randomBlocks.push(this._generateRandomBlock());
    }
    return randomBlocks;
  }

  _renderBlocks() {
    // render the default blocks

    // when user is not playing the game
    // the game has been just initialized
    if (!this.state.isPlaying) {
      return this.state.blocks.map((block, index) => {
        return (
          <VelocityComponent
            animation={{ opacity: 1 }}
            runOnMount={true}
            key={index}
            duration={3000}
          >
            <div className="block-wrapper">
              <Block
                image={block.blockImage}
                color={block.color}
                keyDown={block.key}
                bonusScore={block.bonusScore}
              />
            </div>
          </VelocityComponent>
        );
      });
    } else {
      // the game has started
      // console.log('game has started', this.state.blocks);
      return this.state.blocks.map((block, index) => (
        <div className="block-wrapper" key={index}>
          <Block
            key={index}
            index={index}
            image={block.blockImage}
            color={block.color}
            keyDown={block.key}
            health={block.health}
            bonusScore={block.bonusScore}
          />
        </div>
      ));
    }
  }

  _updateScore() {
    // TODO: 블록당 점수를 얼마나 할 지는 향후 변경될 수 있다
    this.setState(prevState => ({
      score: (prevState.score += 10)
    }));
  }

  _updateEventBlockScore(bonusScore) {
    this.setState(prevState => ({
      score: (prevState.score += bonusScore)
    }));
  }

  _endGame = gameoverReason => {
    this.setState({ isPlaying: false, gameoverReason });
  };

  _restartGame = e => {
    if (e.keyCode === 32) {
      e.preventDefault();
      return;
    }
    if (e.key === 'w' || e.key === 'W') {
      // default state should be now
      // isFirstPlaying: false
      // because the game has been restarted
      this.setState(Object.assign(defaultState, { isFirstPlaying: false }));
      // this.setState((this.state = defaultState())); 위처럼 써줘야 한다.
      this.setState({ blocks: this._generateDefaultBlocks() });
    }
  };

  _checkGameEnd = () => {
    if (
      (this.state.isPlaying && this.state.time === 0) ||
      this.state.gameoverReason
    ) {
      return (
        <div
          id="game-board"
          tabIndex="0"
          onKeyDown={this._restartGame}
          style={this.gameBoardBackground}
        >
          {/* <h1>YOU DEAD!</h1> */}
          <Status.Gameover
            reason={this.state.gameoverReason}
            score={this.state.score}
            lefttime={this.state.time}
          />
        </div>
      );
    } else {
      if (this.state.isPlaying) {
        return (
          <div
            id="game-board"
            tabIndex="0"
            onKeyDown={this._handleKeyDown}
            style={this.gameBoardBackground}
          >
            <Status.Header
              time={this.state.time}
              currentScore={this.state.score}
            />
            <div className="blocks-container">{this._renderBlocks()}</div>
          </div>
        );
      } else {
        return (
          <div
            id="game-board"
            tabIndex="0"
            onKeyDown={this._handleKeyDown}
            style={this.gameBoardBackground}
          >
            <Status.Header
              time={this.state.time}
              currentScore={this.state.score}
            />
            <div className="blocks-container">{this._renderBlocks()}</div>
          </div>
        );
      }
    }
  };

  _shouldMakeBlock = () => {
    if (
      this.state.time === this.state.nextBlockTime &&
      this.state.blocks.length < 13
    ) {
      let newBlock = this._generateRandomBlock();
      console.log(
        'this.state.nextBlockTime time passed! new block generated!',
        this.state.nextBlockTime
      );
      let n;
      n =
        Math.floor(this.state.time / config.nextBlockGenerationSpeed / 10) * 10;

      if (n < config.nextBlockGenerationInterval)
        n = config.nextBlockGenerationInterval;
      // if (n < 300) n = 300;
      let nextBlockTime = this.state.nextBlockTime - n; // 300이 적당하다
      this.setState({
        blocks: [...this.state.blocks, newBlock],
        nextBlockTime
      });
    }
    if (this.state.blocks.length > 11) this._endGame('exceedBlockLimit');
  };

  _renderGamestart = () => (
    <div id="game-board" tabIndex="0" style={this.gameBoardBackground}>
      <Status.Gamestart onClick={() => this._handleGamestartClick} />
    </div>
  );

  _handleGamestartClick = () => {
    console.log('Gamestart clicked');
    this.setState({
      blocks: this._generateDefaultBlocks(),
      isFirstPlaying: false,
      isPlaying: true
    });
    this.interval = setInterval(() => this._tick(), 10);
  };

  componentDidMount = () => {
    // Gamestart render
    this._renderGamestart();
  };

  render() {
    if (this.state.isFirstPlaying) {
      return this._renderGamestart();
    }

    if (this.state.isPlaying) {
      console.log('User is now playing the game');
      this._shouldMakeBlock();
      return this._checkGameEnd();
    } else {
      if (this.state.gameoverReason) {
        console.log('gameoverReason', this.state.gameoverReason);
        return this._checkGameEnd();
      } else {
        // restart the game
        this._shouldMakeBlock();
        return this._checkGameEnd();
      }
    }
  }
}

export default App;
