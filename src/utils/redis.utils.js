const client = require('../config/redis.config');

const setToken = async (key, value, expiryTime) => {
  await client.set(key, value, 'EX', expiryTime);
};

const getToken = async (key) => {
  const tokenFromRedis = await client.get(key);
  return tokenFromRedis;
};

module.exports = {
  setToken,
  getToken,
};
