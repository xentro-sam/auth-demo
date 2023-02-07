const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHash = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const verifyHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    getHash,
    verifyHash
};