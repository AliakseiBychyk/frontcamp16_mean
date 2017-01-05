var express = require('express'),
  path = require('path'),
  User = require('./models/user'),
  Post = require('./models/post'),
  rootPath = path.normalize(__dirname + '/../'),
  router = express.Router();

module.exports = function(app, passport){  

  app.use('/', router);

  router.get('/', function(req, res, next) {
    res.render('index', { title: "Aleks's Blog", user: req.user });
  });

  router.get('/logout', function (req, res) {
    res.redirect('index');
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

  router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
  });

  router.post('/login', passport.authenticate('local'), function (req, res, next) {
    res.redirect('/blog');
  });

  router.get('/blog', function (req, res) {
    Post.find({}).sort({ date: -1 }).exec(function (err, posts) {
      if (err) throw error;
      res.render('blog', { posts: posts });
    });
  });

  router.post('/blog', function (req, res) {
    res.redirect('/newpost');
  });

  router.get('/newpost', function(req, res) {
    res.render('newpost', {});
  });

  router.post('/newpost', function (req, res) {
    console.log('POST: ');
    console.log(req.body);
    var post = new Post({
      title: req.body.title,
      body: req.body.body,
      permalink: req.body.permalink,
      author: req.body.author,
      tags: req.body.tags.split(", "),
      date: req.body.date
    });
    post.save(function (err) {
      if (err) {
        return console.error(err);
        return res.render('newpost', {});
      } else {
        res.redirect('/blog');
      }
    });
  });

  app.use(function(req, res, next){
    res.status(404);
    res.render('404');
    return;
  });
  
};
