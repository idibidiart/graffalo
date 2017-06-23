'use strict';

const mongoose = require('mongoose');
const user = require('./user');
const item = require('./item');
const order = require('./order');
const viewer = require('./viewer');
const graphql = require('./graphql');
const authentication = require('./authentication');


module.exports = function() {
  const app = this;
  
  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;
  
  app.configure(authentication);
  app.configure(user);
  app.configure(item);
  app.configure(order);
  app.configure(viewer);
  app.configure(graphql);
};
