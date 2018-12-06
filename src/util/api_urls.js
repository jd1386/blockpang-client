const BASE_URL = 'http://54.180.96.35:8000';

export default {
  create_wallet: `${BASE_URL}/wallet/create`,
  update_wallet: `${BASE_URL}/wallet/update`,
  transfer: `${BASE_URL}/transfer`,
  leaderboard: `${BASE_URL}/db/leaderboard`,
  transaction: `${BASE_URL}/db/transaction`,
  totaluser: `${BASE_URL}/db/users`,
  stat: `${BASE_URL}/db/stat`,
  admin_summary: `${BASE_URL}/db/summary`,
  admin_get_limit: `${BASE_URL}/admin/get_limit`,
  admin_set_limit: `${BASE_URL}/admin/set_limit`
};
