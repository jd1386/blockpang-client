const test = {
  time: 500000,
  nextBlockTime: 499950,
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
    1: {
      multiBlockKeys: [['a', 's'], ['d', 'f'], ['a', 's', 'd', 'f', 'f']],
      appearanceScoreConditions: 1500,
      appearanceProbability: 100 //
    },
    10: {
      multiBlockKeys: [['{', '{'], '[', ']', ['{', '}']], //폰트가 지원하지 않는 경우 블럭에 키 표시 안 됨
      appearanceScoreConditions: 1500,
      appearanceProbability: 100
    }
  },
  randomBlockProbability: 15, // 1~100%
  nextBlockGenerationSpeed: 5000, // direct proportion
  nextBlockGenerationInterval: 300,
  allowedKeyCodes: [9, 13, 16, 17, 18, 20, 32, 91] //9tab, 13enter, 16shift, 17ctrl,18alt,20capslock, 32space, 91ctrl,
};
//TODO: normal에 있고 test에 굳이 적혀 있지 않은 코드는 normal에 존재하는 코드를 계승하도록...

const normal = {
  time: 300000,
  nextBlockTime: 295000,
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
  nextBlockGenerationSpeed: 500, // direct proportion
  nextBlockGenerationInterval: 300,
  allowedKeyCodes: [9, 13, 16, 17, 18, 20, 32, 91] //9tab, 13enter, 16shift, 17ctrl,18alt,20capslock, 32space, 91ctrl,
};

export default {
  test,
  normal
};
