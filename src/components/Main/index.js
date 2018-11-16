import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Divider } from "semantic-ui-react";

const instructions = () => {
  return (
    <React.Fragment>
      <Header as="h2">게임 방법</Header>
      <Segment textAlign="left">
        <ul>
          <li>게임이 시작되면 블록이 여러층으로 쌓인 스택이 나타난다.</li>
          <li>블록은 빨강, 초록, 파랑의 3가지 종류가 있다.</li>
          <li>
            가장 아래칸의 블록 색깔에 따라, 지정된 키보드 버튼을 입력하면 해당
            블록이 파괴된다.
          </li>
          <li>최하단의 블록이 파괴되면 유저의 점수가 올라간다.</li>
          <li>유저는 게임 시간(예시 - 30초) 동안 위의 과정을 반복한다.</li>
          <li>
            잘못된 버튼을 입력하면 즉시 게임이 끝난다. 남은 시간이 0이 되도
            게임이 끝난다.
          </li>
          <Divider />
          <li>
            폭탄 블록을 파괴하면 폭탄 블록 위의 동일 색상의 모든 블록을
            파괴한다.
          </li>
          <li>
            보너스 블록을 파괴하면 보너스 점수를 유저 점수에 추가한다. (예시 -
            민트색 블록, 어떤 버튼을 눌러도 파괴된다.)
          </li>
          <li>
            중간 보스: 여러 번 버튼을 동시에 눌러야 사라지는 콤보 블록이
            나타난다.
          </li>
          <li>
            잘못된 키 입력 시 게임이 종료되지 않고 남은 게임 시간이 n초
            감소한다.
          </li>
        </ul>
      </Segment>
    </React.Fragment>
  );
};

const board = () => {
  return (
    <div id="game-board" style={{ height: "80vh", backgroundColor: "#ddd" }} />
  );
};

export default {
  instructions,
  board
};
