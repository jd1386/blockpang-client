import axios from 'axios';
import moment from 'moment';
import API_URLS from './api_urls';

const DATE_FORMATS = {
  // long: 'M-DD-YYYY, h:mm:ss a',
  long: 'YYYY-M-DD, HH:mm:ss',
  short: 'YYYY-M-DD',
  // short: 'M-DD-YYYY',
  month: 'YYYY-M'
};

const isLoggedIn = () => {
  return localStorage.getItem('userData') !== null;
};

const userData = () => {
  return JSON.parse(localStorage.getItem('userData'));
};

const setUserData = newUserData => {
  localStorage.setItem('userData', newUserData);
};

const walletAddress = () => {
  return localStorage.getItem('walletAddress');
};

const setWalletAddress = newAddress => {
  localStorage.setItem('walletAddress', newAddress);
};

const isAdmin = () => {
  return localStorage.getItem('adminToken') !== null;
};

const adminToken = () => {
  return {
    headers: {
      Authorization: localStorage.getItem('adminToken')
    }
  };
};

const requestTransfer = game_score => {
  const reqBody = {
    user: userData(),
    wallet: walletAddress(),
    game_score
  };

  return new Promise((resolve, reject) => {
    axios
      .post(API_URLS['transfer'], reqBody)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const transferPreviousScore = () => {
  const previousGameScore = localStorage.getItem('previousGameScore');
  if (previousGameScore) {
    requestTransfer(previousGameScore);
    // reset previousGameScore to null
    localStorage.setItem('previousGameScore', '');
  }
};

const toKoreanTime = (originalTime, format = 'long') => {
  return moment
    .parseZone(originalTime)
    .utcOffset(9)
    .format(DATE_FORMATS[format]);
};

const _providerColor = provider => {
  const COLORS = {
    google: '#dd4b39',
    facebook: '#3b5998'
  };

  return COLORS[provider];
};

export default {
  isLoggedIn,
  userData,
  setUserData,
  walletAddress,
  setWalletAddress,
  requestTransfer,
  transferPreviousScore,
  isAdmin,
  adminToken,
  toKoreanTime,
  _providerColor,
  API_URLS
};
