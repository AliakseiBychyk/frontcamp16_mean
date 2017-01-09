const mongoose = require('mongoose');

module.exports = function myPostFunction(Post) {
  Post.find({}).sort({ date: -1 }).exec(function (err, posts) {
    if (err) throw error;
    res.render('blog', { posts: posts });
  });
};
