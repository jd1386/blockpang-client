const test = {
  time: 30000,
  nextBlockTime: 29500,
  score: 0,
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
  nextBlockGenerationSpeed: 50, // direct proportion
  nextBlockGenerationInterval: 300,
  allowedKeyCodes: [9, 13, 16, 17, 18, 20, 32, 91] //9tab, 13enter, 16shift, 17ctrl,18alt,20capslock, 32space, 91ctrl,
};

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
