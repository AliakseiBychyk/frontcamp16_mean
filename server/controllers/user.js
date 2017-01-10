const mongoose = require('mongoose');

function UserDAO(userModel) {

  this.userModel = userModel;
  this.getUser = function (username, callback) {
    userModel.findOne({username: username}).exec(function (err, user) {
      if (err) throw error;
      callback(user);
    });
  }
};

module.exports.UserDAO = UserDAO;