const AuthServices = require('../services/auth.services');
const  client  = require('../../redis.config');

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
        await client.set(token, username, "EX", 3600);
        return res.status(200).json({ message: "Login successful", token});
    }
    catch (err) {
        return res.status(500).json({error : err.message});
    }
};

const validateToken = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
        const tokenFromRedis = await client.get(token);
        if (!tokenFromRedis) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isValid = await AuthServices.validateToken(token);
        return res.status(200).json({...isValid, username: tokenFromRedis});
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