import React from 'react';
import './App.css';
import { random } from 'lodash';
import { Spring, Transition } from 'react-spring';
import Block from './components/block';
import Status from './components/status';
import Gameover from './components/status/gameover';

const defaultState = () => {
  // TODO:
  // check boardSize based on user's screen size
  // update boardSize
  let userBoardSize = 30;
  // return initial state
  return {
    boardSize: userBoardSize,
    time: '30',
    score: 0,
    blocks: [],
    isPlaying: false,
    gameoverReason: ''
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.blockColors = ['red', 'green', 'blue'];
    this.blockKeys = ['a', 's', 'd'];
    this.state = defaultState();
  }

  _tick = () => {
    if (this.state.gameoverReason) return;
    if (this.state.isPlaying) {
      this.state.time > 0
        ? this.setState(prevState => ({
            time: prevState.time - 1
          }))
        : this.setState(prevState => ({
            time: 0
          }));
    }
    if (this.state.time <= 0) this.setState({ gameoverReason: 'timeover' });
  };

  _handleKeyDown = e => {
    let isStart;

    if (e.keyCode === 32) {
      e.preventDefault();
      return;
    }

    if (!this.state.isPlaying) {
      isStart = true;
      this.setState({ isPlaying: true });
    }
    if (this.state.blocks.length === 0) return;

    let nextBlocks = this.state.blocks.slice(0, this.state.blocks.length);
    // key 값이 일치하면, blocks 데이터를 삭제한다.
    if (e.key.toLowerCase() === nextBlocks[nextBlocks.length - 1].key) {
      nextBlocks.pop();
      this.setState({ blocks: nextBlocks });

      // 점수를 업데이트한다
      this._updateScore();

      // 약간의 시간 간격을 두고 새로운 블럭을 스택 상단에 쌓는다
      // TODO: 지금은 기본 기능만 구현한 것이므로
      // 아래 로직은 향후 바뀔 수 있음
      setTimeout(() => {
        console.log('new block!');
        this.setState({
          blocks: [this._generateRandomBlock(), ...this.state.blocks]
        });
      }, 400);
    } else if (!isStart) {
      // 시작하자마자 버튼 잘못 눌러서 사망하는 상황 방지. 첫 입력 미스는 막아줌.
      this._gameEnd();
    }
  };

  _generateRandomBlock() {
    let randomIndex = random(this.blockColors.length - 1);

    return {
      color: this.blockColors[randomIndex],
      key: this.blockKeys[randomIndex]
    };
  }

  _generateDefaultBlocks() {
    // generate an array of random blocks
    let randomBlocks = [];

    for (let i = 0; i < 5; i++) {
      randomBlocks.push(this._generateRandomBlock());
    }
    return randomBlocks;
  }

  _renderDefaultBlocks() {
    // render the default blocks
    // return this.state.blocks.map((block, index) => {
    //   return <Block key={index} color={block.color} keyDown={block.key} />;
    // });

    if (!this.state.isPlaying) {
      return this.state.blocks.map((block, index) => {
        return (
          <Spring
            from={{
              opacity: 0
            }}
            to={{
              opacity: 1
            }}
            delay={2000}
            key={index}
          >
            {(props, index) => (
              <div className="block-wrapper" style={props}>
                <Block key={index} color={block.color} keyDown={block.key} />
              </div>
            )}
          </Spring>
        );
      });
    } else {
      return this.state.blocks.map((block, index) => {
        return (
          <div className="block-wrapper" key={index}>
            <Block color={block.color} keyDown={block.key} />
          </div>
        );
      });
    }

    // return (
    //   <Transition
    //     items={this.state.blocks}
    //     from={{ transform: "translate3d(0,-40px,0)" }}
    //     enter={{ transform: "translate3d(0,0px,0)" }}
    //     leave={{ transform: "translate3d(0,-40px,0)" }}
    //   >
    //     {block => props => <Block color={block.color} keyDown={block.key} />}
    //   </Transition>
    // );
  }

  _updateScore() {
    // TODO: 블록당 점수를 얼마나 할 지는 향후 변경될 수 있다
    this.setState(prevState => ({
      score: (prevState.score += 10)
    }));
  }

  _gameEnd = () => {
    this.setState({ gameoverReason: 'miss' });
  };

  _gameRestart = e => {
    if (e.keyCode === 32) {
      e.preventDefault();
      return;
    }
    if (e.key === 'w' || e.key === 'W') {
      this.setState(defaultState());
      // this.setState((this.state = defaultState())); 위처럼 써줘야 한다.
      this.setState({ blocks: this._generateDefaultBlocks() });
    }
  };
  componentDidMount = () => {
    this.setState({ blocks: this._generateDefaultBlocks() });
    this.interval = setInterval(() => this._tick(), 1000);
    window.focus();
  };

  _gameEndCheck = () => {
    if (
      (this.state.isPlaying && this.state.time === 0) ||
      this.state.gameoverReason === 'miss'
    ) {
      return (
        <div id="game-board" tabIndex="0" onKeyDown={this._gameRestart}>
          {/* <h1>YOU DEAD!</h1> */}
          <Gameover
            reason={this.state.gameoverReason}
            score={this.state.score}
            lefttime={this.state.time}
          />
        </div>
      );
    } else {
      return (
        <div id="game-board" tabIndex="0" onKeyDown={this._handleKeyDown}>
          <Status time={this.state.time} score={this.state.score} />
          <div className="blocks-container">{this._renderDefaultBlocks()}</div>
        </div>
      );
    }
  };

  render() {
    return <div>{this._gameEndCheck()}</div>;
  }
}

export default App;
