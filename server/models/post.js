var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: { type: String, required: true},
  body: { type: String, required: true },
  permalink: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  tags: {
    title: String
  },
  comments: [{
    body: String,
    num_likes: { type: Number, default: 0 },
    email: { type: String, match: /.+@.+\..+/, lowercase: true}
  }],
  date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Post', postSchema);