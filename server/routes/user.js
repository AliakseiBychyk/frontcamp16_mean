const express = require('express');
const path = require('path');
const User = require('../models/user');
const rootPath = path.normalize(__dirname + '/../');
const router = express.Router();
const UserDAO = require('../controllers/user.js').UserDAO;

const users = new UserDAO(User);

router.get('/', function (req, res) {
  res.send('Type username in address bar, e.g.: "localhost:3030/user/AnyUserName" ');
});

router.get('/:user', function (req, res) {
  let user_id = req.params.user;
  console.log(user_id);
  res.render('user', { user: user_id });
});

router.get('/:user/about', function (req, res) {

  // logic placed in controller
  users.getUser(req.params.user, function (user) {
    if (!user) res.redirect('/:user'); 
    res.render('about', { user: user }); 
  })   
});

module.exports = router;




