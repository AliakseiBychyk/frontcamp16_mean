const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const assert = require('assert');
const app = express();

const env = process.env.NODE_ENV || 'development';
const envConfig = require('./server/env')[env];

mongoose.connect(envConfig.db);

require('./server/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require('./server/routes/index.js')(app, passport);

app.listen(envConfig.port, function(){
  console.log('Server listening on port ' + envConfig.port)
});