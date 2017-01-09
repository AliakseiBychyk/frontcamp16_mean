const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true},
  body: { type: String, required: true },
  permalink: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  tags: [
    { type: String }
  ],
  comments: [{
    body: String,
    num_likes: { type: Number, default: 0 },
    email: { type: String, match: /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/, lowercase: true}
  }],
  date: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Post', postSchema);