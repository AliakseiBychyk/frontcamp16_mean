var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true }
});

module.exports = mongoose.model('Session', sessionSchema);