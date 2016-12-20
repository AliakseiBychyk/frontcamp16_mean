var path = require('path'),
  rootPath = path.normalize(__dirname + '/../../');
  
module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost/frontcamp',
    port: process.env.PORT || 3000
  },
  production: {
    rootPath: rootPath,
    db: process.env.MONGOLAB_URI || 'mongodb://Aleks:frontCamp16@ds147537.mlab.com:47537/frontcamp16',
    port: process.env.PORT || 80
  }
};