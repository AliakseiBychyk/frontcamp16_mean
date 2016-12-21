var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, match: /.+@.+\..+/, lowercase: true },
  password: String
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use _id for username field (previously email)
User.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', User);