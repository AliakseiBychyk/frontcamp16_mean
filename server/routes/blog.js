const express = require('express');
const path = require('path');
const Post = require('../models/post');
const rootPath = path.normalize(__dirname + '/../');
const router = express.Router();
const PostDAO = require('../controllers/post.js').PostDAO;

const posts = new PostDAO(Post);

router.get('/', function (req, res) {
  
  // logic placed in controller
  posts.getPosts(function (posts) {
    res.render('blog', { posts: posts });
  });

});

router.post('/', function (req, res) {
  res.redirect('/blog/newpost');
});

router.get('/newpost', function(req, res) {
  res.render('newpost', {});
});

router.post('/newpost', function (req, res) {
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

module.exports = router;