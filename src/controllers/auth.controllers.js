const AuthServices = require('../services/auth.services');
const {setToken, getToken} = require('../utils/redis.utils');
const CustomError = require('../utils/customError.utils');

const storeUserSecrets = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await AuthServices.storeUserSecrets(email, password);
    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({error: err.message});
    }
    return res.status(500).json({error: err.message});
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const token = await AuthServices.loginUser(email, password);
    await setToken(token, 'token', 3600);
    return res.status(200).json({message: 'Login successful', token});
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({error: err.message});
    }
    return res.status(500).json({error: err.message});
  }
};

const validateToken = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const tokenFromRedis = await getToken(token);
    if (!tokenFromRedis) {
      return res.status(401).json({message: 'Unauthorized'});
    }
    const isValid = await AuthServices.validateToken(token);
    return res.status(200).json({message: isValid});
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({error: err.message});
    }
    return res.status(500).json({error: err.message});
  }
};

module.exports = {
  storeUserSecrets,
  loginUser,
  validateToken,
};
