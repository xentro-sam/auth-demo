const db = require('../models');
const {getHash, verifyHash} = require('../utils/hash.utils');
const {sign, verify} = require('../utils/jwt.utils');
const CustomError = require('../utils/customError.utils');

const storeUserSecrets = async (email, password) => {
  const userExists = await db.Users.findOne({where: {email}});
  if (userExists) {
    throw new CustomError(400, 'User already exists');
  }
  const hash = getHash(password);
  const user = await db.Users.create({email, password: hash});
  return user;
};

const loginUser = async (email, password) => {
  const user = await db.Users.findOne({where: {email}});
  if (!user) {
    throw new CustomError(400, 'User does not exist');
  }
  const isValid = verifyHash(password, user.password);
  if (!isValid) {
    throw new CustomError(401, 'Invalid password');
  }
  const token = sign({email: user.email});
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
