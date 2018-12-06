import moment from 'moment';
import API_URLS from './api_urls';

const DATE_FORMATS = {
  long: 'M-DD-YYYY, h:mm:ss a',
  short: 'M-DD-YYYY',
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

const toKoreanTime = (originalTime, format = 'long') => {
  return moment
    .parseZone(originalTime)
    .utcOffset(9)
    .format(DATE_FORMATS[format]);
};
const _providerColor = provider => {
  let COLORS = ['#dd4b39', '#3b5998'];
  if (provider === 'google') return COLORS[0];
  else if (provider === 'facebook') return COLORS[1];
};

export default {
  isLoggedIn,
  userData,
  setUserData,
  walletAddress,
  setWalletAddress,
  toKoreanTime,
  _providerColor,
  API_URLS
};
