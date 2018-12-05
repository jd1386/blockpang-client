import React from 'react';
import './App.scss';
import { random } from 'lodash';
import Board from './components/board';
import BlockList from './components/block/blockList';
import Status from './components/status';
import { Image } from 'semantic-ui-react';
import Util from './utils';
import gameConfig from './config';
import coinImage from './assets/img/coin.gif';

const config = gameConfig.test;
// const config = gameConfig.normal;

const defaultState = {
  time: config.time,
  nextBlockTime: config.nextBlockTime,
  score: config.score,
  blocks: [],
  isFirstPlaying: true,
  isPlaying: false,
  gameoverReason: '',
  numOfIcons: 0,
  currentStage: 1,
  gameMessage: ''
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.boardBackground = Util.generateRandBackgroundForStage('stage1');
    this.state = defaultState;
  }

  _alertMessage(gameMessage) {
    this.setState({
      gameMessage
    });
  }
  isKoreanChar(ch) {
    let c = ch.charCodeAt(0);
    if (0x1100 <= c && c <= 0x11ff) return true;
    if (0x3130 <= c && c <= 0x318f) return true;
    if (0xac00 <= c && c <= 0xd7a3) return true;
    return false;
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
            time: prevState.time - 10 // miliseconds
          }))
        : this.setState(prevState => ({
            time: 0
          }));
    }
    if (this.state.time <= 0) this.setState({ gameoverReason: 'timeover' });
  };

  _handleKeyDown = e => {
    let isStart;
    // console.log('user input key', e.key, 'user input keyCode', e.keyCode);

    if (this.isKoreanChar(e.key))
      return this._alertMessage('한글 자판을 영문 자판으로 변환해주세요!');

    if (!this.state.isPlaying) {
      isStart = true;
      this.setState({ isPlaying: true });
    }

    if (this._checkAllowedKeycodes(e)) return;

    if (this.state.blocks.length === 0) return;

    let currentBlocks = this.state.blocks.slice();

    if (e.key.toLowerCase() === currentBlocks[0].key[0]) {
      // If the key value entered matches the key written on the block,
      // delete the block data from the currentBlocks array.

      if (
        currentBlocks[0].key.length === 1 &&
        (currentBlocks[0].health === 1 || !currentBlocks[0].health)
      ) {
        // There is only one key input to destroy the block, and block health prop 1 or no
        this._destroySingleKeyBlock(currentBlocks);
      } else if (currentBlocks[0].key.length > 1) {
        // Multiple key inputs to destroy block
        this._destroyMultiKeyBlock();
      } else if (currentBlocks[0].health) {
        // Block with health, you must input the key several times before it will be destroyed
        // TODO: Block handling with both multi-key and health attributes has not yet been considered.
        let [firstBlock, ...otherBlocks] = this.state.blocks;
        if (firstBlock.health > 1) firstBlock.health -= 1;

        this.setState({
          blocks: [firstBlock, ...otherBlocks]
        });
      }
    } else if (!isStart) {
      // Prevent death by pressing the wrong button as soon as it starts. The first input miss is blocked.
      this._endGame('missInput');
    }
  };

  _destroySingleKeyBlock(currentBlocks) {
    let keepBonusScore;

    if (!currentBlocks[0].type) {
      // regular block
      keepBonusScore = currentBlocks[0].bonusScore;
      currentBlocks.shift();

      this.setState({
        blocks: currentBlocks,
        gameMessage: 'Hit!'
      });
      this._resetGameMessage();

      this._updateScore(10);

      if (keepBonusScore) {
        // add bonus score
        this._updateEventBlockScore(keepBonusScore);
      }
    } else {
      // bomb block
      // calculate the total score of the currentBlocks
      const sumOfScore = this._sumCurrentBlocksScore(currentBlocks);
      this._updateScore(sumOfScore);
      // empty blocks from the state
      this.setState({
        blocks: [],
        gameMessage: 'Bomb!!!'
      });

      this._resetGameMessage(500);
    }
  }

  _destroyMultiKeyBlock() {
    let [firstBlock, ...otherBlocks] = this.state.blocks;
    if (firstBlock.key.length > 1) firstBlock.key.shift();

    this.setState({
      blocks: [firstBlock, ...otherBlocks]
    });
  }

  _sumCurrentBlocksScore(currentBlocks) {
    let sum = 0;
    currentBlocks.forEach(block => {
      // if event block, add its bonusScore
      if (block.bonusScore) {
        sum += 10 + block.bonusScore;
      } else {
        // if regular block, add 10
        sum += 10;
      }
    });
    return sum;
  }

  _resetGameMessage(time = 350) {
    // reset gameMessage so it renders again
    setTimeout(() => {
      this.setState(() => ({
        gameMessage: ''
      }));
    }, time);
  }

  _doesNextStageExist() {
    return Boolean(config.stage[this.state.currentStage + 1]);
  }

  _isStageLevelUpCondition() {
    return (
      this.state.score >=
      config.stage[this.state.currentStage + 1].appearanceScoreConditions
    );
  }

  _stageLevelUp() {
    let nextStage = this.state.currentStage + 1; // stage backgroundImage change
    this.boardBackground = Util.generateRandBackgroundForStage(
      `stage${nextStage}`
    );
    this.setState(prevState => ({
      currentStage: prevState.currentStage + 1
    }));
    this._stageLevelUpMsg();
    this._addBonusTime();
  }

  _stageLevelUpMsg() {
    this.setState(prevState => ({
      gameMessage: `BonusTime ${config.stage[this.state.currentStage + 1]
        .bonusTime / 1000} Sec`
    }));

    // reset gameMessage so it renders again
    setTimeout(() => {
      this.setState(() => ({
        gameMessage: ''
      }));
    }, 2000);
  }

  _addBonusTime() {
    this.setState(prevState => ({
      time:
        prevState.time + config.stage[this.state.currentStage + 1].bonusTime,
      nextBlockTime:
        prevState.nextBlockTime +
        config.stage[this.state.currentStage + 1].bonusTime
    }));
  }

  _generateBlock() {
    if (this._doesNextStageExist() && this._isStageLevelUpCondition()) {
      this._stageLevelUp();
    }

    return this._generateRandomBlock();
  }

  _generateRandomBlock() {
    if (!this.state.isPlaying) return;
    let randomNum = random(1, 100);
    let block;

    switch (true) {
      case randomNum <= config.bonusBlockProbability:
        block = this._generateBonusBlock();
        break;
      case randomNum <=
        config.bonusBlockProbability + config.iconBlockProbability:
        block = this._generateIconBlock();
        break;
      case randomNum <=
        config.bonusBlockProbability +
          config.iconBlockProbability +
          config.bombBlockProbability:
        block = this._generateBombBlock();
        break;
      case randomNum <=
        config.bonusBlockProbability +
          config.iconBlockProbability +
          config.bombBlockProbability +
          config.stage[this.state.currentStage].appearanceProbability:
        block = this._generateBasicMultiBlock();
        break;
      default:
        block = this._generateBasicBlock();
    }
    return block;
  }

  _generateBonusBlock() {
    let randomKeyIndex = random(config.eventBlock.keys.length - 1);
    return {
      blockImage: <Image size="mini" src={coinImage} className="block-image" />,
      color: `${Util.getRandColor(4)}`,
      key: config.eventBlock.keys[randomKeyIndex].slice(),
      bonusScore: random(1, 30)
    };
  }

  _generateIconBlock() {
    let randomKeyIndex = random(config.eventBlock.keys.length - 1);
    return {
      blockImage: (
        <Image size="mini" src="favicon.ico" className="block-image" />
      ),
      color: '#1aaaba',
      key: config.eventBlock.keys[randomKeyIndex].slice(),
      bonusScore: random(51, 100)
    };
  }

  _generateBombBlock() {
    return {
      blockImage: <Image size="mini" src="bomb.png" className="block-image" />,
      color: 'black',
      key: 'q',
      type: 'bomb'
    };
  }

  _generateBasicMultiBlock() {
    let randomColorIndex = random(config.block.colors.length - 1);
    let randomKeyIndex = random(
      config.stage[this.state.currentStage].multiBlockKeys.length - 1
    );
    return {
      color: config.block.colors[randomColorIndex],
      key: config.stage[this.state.currentStage].multiBlockKeys[
        randomKeyIndex
      ].slice()
    };
  }

  _generateBasicBlock(
    randomIndex = random(config.block.colors.length - 1),
    keySet = config.block.keys[randomIndex] //normalStageKeySet
  ) {
    return {
      color: config.block.colors[randomIndex],
      key: keySet
    };
  }

  _generateInitialBlocks(numOfBlocks = 6) {
    // generate an array of random blocks
    let initialBlocks = [];

    for (let i = 0; i < numOfBlocks; i++) {
      initialBlocks.push(this._generateBasicBlock());
    }
    return initialBlocks;
  }

  _renderBlocks() {
    return (
      <div className="blocks-container">
        <BlockList blocks={this.state.blocks} />
      </div>
    );
  }

  _updateScore(score) {
    this.setState(prevState => ({
      score: (prevState.score += score)
    }));
  }

  _updateEventBlockScore(bonusScore) {
    this.setState(prevState => ({
      score: (prevState.score += bonusScore)
    }));
  }

  _endGame = gameoverReason => {
    clearInterval(this.intervalId);
    this.setState({ isPlaying: false, gameoverReason });
  };

  _restartGame = e => {
    if (this.isKoreanChar(e.key))
      return this.setState({ gameoverReason: 'inputSourceKorean' });

    if (e.keyCode === 32) {
      e.preventDefault();
      return;
    }
    if (e.key === 'w' || e.key === 'W') {
      // default state should be now
      // isFirstPlaying: false
      // because the game has been restarted
      this.intervalId = setInterval(() => this._tick(), 10);
      this.boardBackground = Util.generateRandBackgroundForStage('stage1');
      this.setState({
        ...defaultState,
        ...{ isFirstPlaying: false },
        blocks: this._generateInitialBlocks()
      });
    }
  };

  _isGameEnded = () => {
    // game has ended if the following condtions are met
    return (
      (this.state.isPlaying && this.state.time === 0) ||
      this.state.gameoverReason
    );
  };

  _checkGameEnd = () => {
    // game is now ended
    if (this._isGameEnded()) {
      return (
        <Board
          handleKeyDown={this._restartGame}
          boardBackground={this.boardBackground}
          time={this.state.time}
          currentScore={this.state.score}
          stage={this.state.currentStage}
        >
          <Status.Gameover
            reason={this.state.gameoverReason}
            score={this.state.score}
          />
        </Board>
      );
    } else {
      // game is being played
      return (
        <Board
          handleKeyDown={this._handleKeyDown}
          boardBackground={this.boardBackground}
          time={this.state.time}
          currentScore={this.state.score}
          message={this.state.gameMessage}
          stage={this.state.currentStage}
        >
          {this._renderBlocks()}
        </Board>
      );
    }
  };

  _renderGamestart = () => (
    <Board
      boardBackground={this.boardBackground}
      time={this.state.time}
      currentScore={this.state.score}
      stage={this.state.currentStage}
    >
      <Status.Gamestart onClick={() => this._handleGamestartClick} />
    </Board>
  );

  _handleGamestartClick = () => {
    this.setState({
      blocks: this._generateInitialBlocks(),
      isFirstPlaying: false,
      isPlaying: true
    });

    this.intervalId = setInterval(() => this._tick(), 10);
  };

  _renderWalletMissing() {
    return (
      <Board
        boardBackground={this.boardBackground}
        time={this.state.time}
        currentScore={this.state.score}
        stage={this.state.currentStage}
      >
        <Status.WalletMissing />
      </Board>
    );
  }

  _shouldMakeBlock = () => {
    if (
      this.state.time === this.state.nextBlockTime &&
      this.state.blocks.length < 13
    ) {
      let newBlock = this._generateBlock();

      // console.log(
      //   'this.state.nextBlockTime time passed! new block generated!',
      //   this.state.nextBlockTime
      // );
      let nextBlockGenerationInterval =
        Math.floor(this.state.time / config.nextBlockGenerationSpeed / 10) * 10;

      if (nextBlockGenerationInterval < config.nextBlockGenerationInterval)
        nextBlockGenerationInterval = config.nextBlockGenerationInterval;

      this.setState(prevState => ({
        blocks: [...this.state.blocks, newBlock],
        nextBlockTime: prevState.nextBlockTime - nextBlockGenerationInterval
      }));
    }
    if (this.state.blocks.length > 11) this._endGame('exceedBlockLimit');
  };

  componentDidMount = () => {
    // Gamestart render
    this._renderGamestart();
  };

  render() {
    if (this.state.isFirstPlaying) {
      // logged in
      if (localStorage.getItem('userData')) {
        // wallet registered
        if (localStorage.getItem('walletAddress')) {
          return this._renderGamestart();
        } else {
          // wallet not registered
          return this._renderWalletMissing();
        }
      } else {
        // not logged in
        return this._renderGamestart();
      }
    }

    if (this.state.isPlaying) {
      this._shouldMakeBlock();
      return this._checkGameEnd();
    } else {
      if (this.state.gameoverReason) {
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
