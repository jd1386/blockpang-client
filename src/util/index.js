import moment from 'moment';
import API_URLS from './api_urls';

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

const toKoreanTime = originalTime => {
  return moment
    .parseZone(originalTime)
    .utcOffset(9)
    .format('M-DD-YYYY, h:mm:ss a');
};

export default {
  isLoggedIn,
  userData,
  setUserData,
  walletAddress,
  setWalletAddress,
  toKoreanTime,
  API_URLS
};
