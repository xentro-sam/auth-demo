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
};

module.exports = {
    storeUserSecrets,
    loginUser
};