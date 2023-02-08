const express = require('express');
const { storeUserSecrets, loginUser, validateToken } = require('../controllers/auth.controllers');

const AuthRoutes = express.Router();

AuthRoutes.route('/user')
    .post(storeUserSecrets);

AuthRoutes.route('/login')
    .get(loginUser);

AuthRoutes.route('/token/validate')
    .post(validateToken);

module.exports = AuthRoutes;