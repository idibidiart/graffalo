
'use strict';

// user-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// do not add any kind of validation here 
const userSchema = new Schema({
  roles: {type: [String], 'default': ["USER"]},
  username: {type: String, unique: true},
  password: { type: String},
  firstName: { type: String},
  lastName: { type: String},
  phoneNumber: { type: String},
  favoriteItemsIds: { type: [String]},
  orderIds: { type: [String], 'default': []},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
