const mongoose = require('mongoose');

function PostDAO(postModel) {
  
  this.postModel = postModel;
  this.getPosts = function (callback) {
    postModel.find({}).sort({ date: -1 }).exec(function (err, posts) {
      if (err) throw error;
      callback(posts);
    })  
  }
};

module.exports.PostDAO = PostDAO;