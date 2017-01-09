const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

  passport.use(new LocalStrategy(User.authenticate())); // <-- this line works in the same way as a line following below and seems to be unnecessary 
  passport.use(User.createStrategy()); 

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
