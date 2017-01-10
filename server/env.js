const path = require('path');
const  rootPath = path.normalize(__dirname + '/../../');
  
module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost/frontcamp',
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: process.env.MONGOLAB_URI || 'mongodb://ds147537.mlab.com:47537/frontcamp16',
    port: process.env.PORT || 80
  }
};