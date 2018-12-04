const BASE_URL = 'http://54.180.114.119:8000';

export default {
  create_wallet: `${BASE_URL}/wallet/create`,
  update_wallet: `${BASE_URL}/wallet/update`,
  transfer: `${BASE_URL}/transfer`,
  leaderboard: `${BASE_URL}/leaderboard`,
  transaction: `${BASE_URL}/db/transaction`,
  latest: `${BASE_URL}/db/latest`,
  admin_get_limit: `${BASE_URL}/admin/get_limit`,
  admin_current_balance: `${BASE_URL}/admin/current_balance`
};
