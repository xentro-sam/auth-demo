const db = require('../models');
const {getHash, verifyHash} = require('../utils/hash.utils');
const {sign, verify} = require('../utils/jwt.utils');
const CustomError = require('../utils/customError.utils');

const storeUserSecrets = async (username, password) => {
  const userExists = await db.Users.findOne({where: {username}});
  if (userExists) {
    throw new CustomError(400, 'User already exists');
  }
  const hash = getHash(password);
  const user = await db.Users.create({username, password: hash});
  return user;
};

const loginUser = async (username, password) => {
  const user = await db.Users.findOne({where: {username}});
  if (!user) {
    throw new CustomError(400, 'User does not exist');
  }
  const isValid = verifyHash(password, user.password);
  if (!isValid) {
    throw new CustomError(401, 'Invalid password');
  }
  const token = sign({username: user.username});
  return token;
};

const validateToken = async (token) => {
  const isValid = verify(token);
  if (!isValid) {
    throw new CustomError(401, 'Invalid token');
  }
  return 'Valid token';
};

module.exports = {
  storeUserSecrets,
  loginUser,
  validateToken,
};
