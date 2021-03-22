const jwt = require("jsonwebtoken");
const SECRET_KEY = `rahasia`;

const generateJwt = (user) => {
    const token = jwt.sign(user, SECRET_KEY);
    return token
};

const verifyJwt = (token) => {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    console.log(decoded);
    return decoded;
};

module.exports = {
    generateJwt,
    verifyJwt,
};