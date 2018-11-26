//TODO: normal에 있고 test에 굳이 적혀 있지 않은 코드는 normal에 존재하는 코드를 계승하도록...

const test = {
  time: 30000,
  nextBlockTime: 29500,
  score: 0,
  block: {
    colors: ['#f783ac', '#69db7c', '#4dabf7'],
    keys: ['a', 's', 'd']
  },
  eventBlock: {
    colors: ['lime', 'purple', 'black', 'orange', 'cyan'], //당장 사용되지 않는 칼라
    keys: ['f', 'c'] // 확률 문제는 일단 심플하게 구현하고 생각하기로
  },
  stage: {
    1: {
      multiBlockKeys: [['i']],
      appearanceScoreConditions: 100,
      appearanceProbability: 1,
      bonusTime: 10000
    },
    2: {
      multiBlockKeys: [
        ['a', 'a'],
        ['d', 'd'],
        ['s', 's'],
        ['f', 'f'],
        ['a', 's']
      ],
      appearanceScoreConditions: 700,
      appearanceProbability: 15,
      bonusTime: 10000
    },
    3: {
      multiBlockKeys: [
        ['a', 's'],
        ['d', 'f'],
        ['a', 'd'],
        ['a', 'f'],
        ['s', 'd']
      ],
      appearanceScoreConditions: 1000,
      appearanceProbability: 15,
      bonusTime: 10000
    },
    4: {
      multiBlockKeys: [
        ['s', 'a'],
        ['f', 'd'],
        ['s', 'a'],
        ['a', 's', 'd'],
        ['d', 'a', 's']
      ],
      appearanceScoreConditions: 1400,
      appearanceProbability: 15,
      bonusTime: 10000
    },

    10: {
      multiBlockKeys: [['{', '{'], '[', ']', ['{', '}']], //폰트가 지원하지 않는 경우 블럭에 키 표시 안 됨
      appearanceScoreConditions: 1500,
      appearanceProbability: 100
    }
  },
  randomBlockProbability: 15, // 1~100%
  nextBlockGenerationSpeed: 70, // direct proportion
  nextBlockGenerationInterval: 300,
  allowedKeyCodes: [9, 13, 16, 17, 18, 20, 32, 91] //9tab, 13enter, 16shift, 17ctrl,18alt,20capslock, 32space, 91ctrl,
};

const normal = {
  time: 30000,
  nextBlockTime: 200,
  score: 2000,
  block: {
    colors: ['#f783ac', '#69db7c', '#4dabf7'],
    keys: ['a', 's', 'd']
  },
  eventBlock: {
    colors: ['lime', 'purple', 'black', 'orange', 'cyan'],
    keys: ['f', 'c'] // 확률 문제는 일단 심플하게 구현하고 생각하기로
  },
  stage: {
    0: {
      multiBlockKeys: [['a', 's'], ['d', 'f'], ['a', 's', 'd', 'f', 'f']]
    }
  },
  randomBlockProbability: 15, // 1~100%
  nextBlockGenerationSpeed: 10, // direct proportion
  nextBlockGenerationInterval: 300,
  allowedKeyCodes: [9, 13, 16, 17, 18, 20, 32, 91] //9tab, 13enter, 16shift, 17ctrl,18alt,20capslock, 32space, 91ctrl,
};

export default {
  test,
  normal
};
