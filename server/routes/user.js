const express = require('express');
const path = require('path');
const User = require('../models/user');
const rootPath = path.normalize(__dirname + '/../');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('Type username in address bar, e.g.: "localhost:3030/user/AnyUserName" ');
});

router.get('/:user', function (req, res) {
  let user_id = req.params.user;
  console.log(user_id);
  res.render('user', { user: user_id });
});

router.get('/:user/about', function (req, res) {
  User.findOne({username: req.params.user}).exec(function (err, user) {
    if (err) throw error;
    if (!user) {
        res.redirect('/:user');
    };  
    res.render('about', { user: user });
  });
});

module.exports = router;