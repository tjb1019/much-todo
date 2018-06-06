const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const utilties = require('./utilities');
const User = require('./models/user').User

// connect to mongodb
mongoose.connect('mongodb://localhost/todo');

// authenticate
router.post('/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      if (user.password == req.body.password) {
        const payload = {username: user.username};
        const token = utilties.generateToken(payload);
        res.status(200).json({token: token});
      } else {
        res.status(400).json({message: 'Invalid password'});
      }
    })
    .catch(error => {
      res.status(400).json({message: 'Invalid username'});
    });
});

// new users
router.post('/users', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save()
    .then(user => {
      const payload = {username: user.username};
      const token = utilties.generateToken(payload);
      res.status(201).json({token: token});
    })
    .catch(error => res.status(500).json({message: 'Failed to create new user'}));
});

// add authentication middleware for all other routes
router.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    req.decoded = jwt.verify(token, process.env.FITNESS_SECRET);
    next();
  } else {
    return res.status(401).json({message: 'Failed to authenticate token'});
  }
});

// get todos
router.get('/todos', (req, res) => {
  User.findOne({username: req.decoded.username})
    .then(user => {
      res.status(200).json({todos: user.todos});
    })
    .catch(error => {
      res.status(400).json({message: 'Invalid username'});
    });
});

// create todo
router.post('/todos', (req, res) => {
  User.findOne({username: req.decoded.username})
    .then(user => {
      user.todos.push(req.body.todo);
      user.save();
      res.status(200).json({todos: user.todos});
    })
    .catch(error => {
      res.status(400).json({message: 'Invalid username'});
    });
});

module.exports = router;
