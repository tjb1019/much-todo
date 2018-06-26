const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  todos: [{description: String, active: Boolean}]
});

exports.User = mongoose.model('User', userSchema, 'users');
