const {jwtSecret} = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');


const generateToken = (user) => {
    return jwt.sign(user, jwtSecret, {expiresIn: '1d'});
}

const generateAdminToken = (user) => {
    return jwt.sign(user, jwtSecret, {expiresIn: '1d'});
}

module.exports = {generateToken};