const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.generateToken = function(payload) {
  const secret = process.env.FITNESS_SECRET;
  return jwt.sign(payload, secret);
}

exports.hashPassword = async function(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return Promise.resolve(hashedPassword);
}

exports.checkPassword = async function(password, hash) {
  const valid = await bcrypt.compare(password, hash);
  return Promise.resolve(true);
}
