const express = require('express');
const path = require('path');
const User = require('../models/user');
const user = require('./user');
const blog = require('./blog');
const rootPath = path.normalize(__dirname + '/../');
const router = express.Router();

module.exports = function (app, passport) {

  app.use('/', router);
  app.use('/user', user);
  app.use('/blog', blog);

  router.get('/', function (req, res, next) {
    res.render('index', { title: "Aleks's Blog", user: req.user });
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/register', function(req, res) {
    res.render('register', {});
  });

  router.post('/register', function(req, res){

    User.register(new User({
      username: req.body.username,
      email: req.body.email
    }), req.body.password, function(err, user) {
          if (err) {
            console.error(err);
            return res.render('register', { user: user });
          }

          passport.authenticate('local')(req, res, function(){
            console.log('authenticated by passport');
            res.redirect('/blog');
          });
      });
  });

  router.get('/login', function (req, res) {
    console.log(req.user);
    res.render('login', { user: req.user });
  });

  router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function (req, res, next) {
    res.redirect('/blog');
  });

  app.use(function(req, res, next){
    res.status(404);
    res.send('Error 404: Page not found');
    return;
  });

};