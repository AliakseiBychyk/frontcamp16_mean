const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, match: /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/, lowercase: true },  
  password: String
});

User.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', User);