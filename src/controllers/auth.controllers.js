const AuthServices = require('../services/auth.services');

const storeUserSecrets = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await AuthServices.storeUserSecrets(username, password);
        return res.status(201).json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await AuthServices.loginUser(username, password);
        return res.status(200).json(token);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

const validateToken = async (req, res) => {
    const { token } = req.body;
    try {
        const isValid = await AuthServices.validateToken(token);
        return res.status(200).json(isValid);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    storeUserSecrets,
    loginUser,
    validateToken
};