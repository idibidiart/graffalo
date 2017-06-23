'use strict';

// order-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// do not add any kind of validation here 
const orderSchema = new Schema({
  userId: { type: String},
  itemIds: { type: [String]},
  total: { type: String, 'default': ''},
  statusMessage: { type: String, 'default': ''},
  comment: { type: String},
  fulfilled: { type: Boolean, 'default': false},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
