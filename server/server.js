'use strict';

var express = require('express');
var helper  = require('./helpers');
var app     = express();
var mysql = require('mysql');

app.listen(process.env.PORT || 3000);

require('./config')
require('./routes')(app);
require('./express')(app);
require('./apiRunner');
