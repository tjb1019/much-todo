const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  todos: []
});

exports.User = mongoose.model('User', userSchema, 'users');
