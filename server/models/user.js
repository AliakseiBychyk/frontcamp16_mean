var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, match: /.+@.+\..+/, lowercase: true },
  password: String
});

User.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', User);