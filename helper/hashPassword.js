
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashing = (psw) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(psw, salt);
  return { salt, hash };
};
module.exports = { hashing };