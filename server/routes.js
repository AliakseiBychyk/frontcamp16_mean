var express = require('express'),
  path = require('path'),
  User = require('./models/user'),
  Post = require('./models/post'),
  rootPath = path.normalize(__dirname + '/../'),
 // apiRouter = express.Router(),
  router = express.Router();

module.exports = function(app, passport){  

  app.use('/', router);

  // API routes

  router.get('/', function(req, res, next) {
    res.render('index', { user: req.user });
  });

  router.get('/register', function(req, res) {
    res.render('register', {});
  });

  router.post('/register', function(req, res){

    // passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
    User.register(new User({
      username: req.body.username, email: req.body.email
    }), req.body.password, function(err, user) {
          if (err) {
              console.error(err);
              return res.render('register', { user: user });
          }

          // log the user in after it is created
          passport.authenticate('local')(req, res, function(){
            console.log('authenticated by passport');
            //res.send('You successfully registered on this page!')
            res.redirect('/blog');
          });
      });
  });

  router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
  });

  router.post('/login', passport.authenticate('local'), function (req, res, next) {
    // res.send('You successuflly entered');
    res.redirect('/blog');
  });

  router.get('/blog', function (req, res) {
    res.render('blog', { user: req.user });
  })

  router.post('/blog', function (req, res) {
    res.redirect('/newpost');
  })

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
      tags: req.body.tags,
      date: req.body.date
    });
    post.save(function (err) {
      if (err) {
        return console.error(err);
        return res.render('newpost', {});
      } else {
        return console.log('created');
      }
      return res.send(post);
            res.redirect('/blog');
    });
  });

  app.use(function(req, res, next){
    res.status(404);

    res.render('404');
    return;
  });
  
};

function isAdmin(req, res, next){
  if(req.isAuthenticated() && req.user.email === 'connorleech@gmail.com'){
    console.log('cool you are an admin, carry on your way');
    next();
  } else {
    console.log('You are not an admin');
    res.redirect('/admin');
  }
}