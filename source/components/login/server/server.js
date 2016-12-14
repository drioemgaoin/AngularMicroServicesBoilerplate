'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var path = require('path');
var intravenous  = require('intravenous');
var mongoDbManager = require('./mongoDbManager')();

var app = express();

app.set('port', process.env.NODE_PORT || 9000);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));

var container = intravenous.create();
require('./installer/installer')(container);
require('./installer/controllerInstaller')(container, app);

mongoDbManager.start(function() {
  app.listen(app.get('port'), app.get('host'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
});
