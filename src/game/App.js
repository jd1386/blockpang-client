import React from 'react';
import './App.scss';
import { random } from 'lodash';
// import { Spring, Transition } from 'react-spring';
import { VelocityComponent } from 'velocity-react';
import Block from './components/block';
import Status from './components/status';
import { Image } from 'semantic-ui-react';
import Util from './utils';

const defaultState = {
  time: 300000,
  nextBlockTime: 295000,
  // nextBlockTime: 9500,
  score: 2000,
  blocks: [],
  isFirstPlaying: true,
  isPlaying: false,
  gameoverReason: '',
  randomBlockProbability: 15, //%%
  nextBlockGenerationSpeed: 500
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.gameBoardBackground = Util.generateRandBackground();
    this.blockColors = ['#f783ac', '#69db7c', '#4dabf7']; // this.blockColors = ['red', 'green', 'blue'];
    this.blockKeys = ['a', 's', 'd'];
    this.eventBlockColors = ['lime', 'purple', 'black', 'orange', 'cyan'];
    this.eventBlockKeys = ['f', 'c'];
    this.multiBlockKeysStage1 = [
      ['a', 's'],
      ['d', 'f'],
      ['a', 's', 'd', 'f', 'f']
    ];
    // this.eventBlockKeys = [['{', '{']];
    // this.eventBlockKeys = ['f', 'c'];
    // this.eventBlockColors = [{color : 'mint', probability : 0.5} ] // 확률 문제는 일단 심플하게 구현하고 생각하기로
    this.state = defaultState;
  }

  _checkAllowKeycodes(e) {
    let allowKeyCodes = [9, 13, 16, 17, 18, 20, 32, 91]; //9tab, 13enter, 16shift, 17ctrl,18alt,20capslock, 32space, 91ctrl,

    if (allowKeyCodes.includes(e.keyCode)) {
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

    if (this._checkAllowKeycodes(e)) return;

    if (this.state.blocks.length === 0) return;

    let currentBlocks = this.state.blocks.slice();

    // console.log('현재 입력해야 할 블럭 키', currentBlocks[0].key[0]);
    // console.log('입력키', e.key.toLowerCase());
    // console.log('체력', currentBlocks[0].health);
    // console.log('현재 블록상태', this.state.blocks);
    // if (e.key.toLowerCase() === currentBlocks[0].key) { // 기존 입력할 키가 단 하나였을 경우
    if (e.key.toLowerCase() === currentBlocks[0].key[0]) {
      // key 값이 일치하면, blocks 데이터를 삭제한다.
      if (
        currentBlocks[0].key.length === 1 &&
        (currentBlocks[0].health === 1 || !currentBlocks[0].health)
      ) {
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
        // TODO: 지금은 기본 기능만 구현한 것이므로
        // 아래 로직은 향후 바뀔 수 있음

        // setTimeout(() => {
        //   let newBlock = this._generateRandomBlock();
        //   console.log('new block generated!', newBlock);

        //   this.setState({
        //     blocks: [...this.state.blocks, newBlock]
        //   });
        // }, 350);
      } else if (currentBlocks[0].key.length > 1) {
        let [firstBlock, ...otherBlocks] = this.state.blocks;
        if (firstBlock.key.length > 1) firstBlock.key.shift();

        this.setState({
          blocks: [firstBlock, ...otherBlocks]
        });
      } else if (currentBlocks[0].health) {
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
    let randomIndex = random(this.blockColors.length - 1);
    let randomKeyIndex;
    let randomColor;
    // let blockImage;
    let keySet = this.blockKeys[randomIndex]; //normalStageKeySet

    if (this.state.score > 1500 && random(7) === 0) {
      keySet = this.multiBlockKeysStage1[randomIndex];
    }

    if (
      this.state.isPlaying &&
      random(100) + 1 <= this.state.randomBlockProbability
    ) {
      randomColor = random(1) === 1 ? '#1aaaba' : `${Util.getRandColor(4)}`;

      randomKeyIndex = random(this.eventBlockKeys.length - 1);
      return {
        blockImage:
          randomColor === '#1aaaba' ? (
            <Image size="mini" src="favicon.ico" />
          ) : (
            <Image size="mini" src="coin.gif" id="block-image" />
          ),
        color: randomColor,
        key: this.eventBlockKeys[randomKeyIndex].slice(),
        bonusScore: randomColor === '#1aaaba' ? random(50) + 50 : random(30)
      };
    }

    return {
      color: this.blockColors[randomIndex],
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
      // this.state.gameoverReason === 'miss'
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
              prevScore={this.state.score - 10}
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
              prevScore={0}
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
      // let nextBlockTime = this.state.nextBlockTime - 300; // 300이 적당하다
      let n;
      n =
        Math.floor(this.state.time / this.state.nextBlockGenerationSpeed / 10) *
        10;
      if (n < 300) n = 300;
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

    const timerId = setInterval(() => {
      this._shouldMakeBlock();
    }, 3000);
    // console.log('timerId', timerId);
  };

  componentDidMount = () => {
    console.log('did mount!');
    // Gamestart render
    this._renderGamestart();

    // this.setState({ blocks: this._generateDefaultBlocks() });
    // this.interval = setInterval(() => this._tick(), 10);
    // const timerId = setInterval(() => {
    //   this._shouldMakeBlock();
    // }, 3000);
    // // console.log('timerId', timerId);
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
