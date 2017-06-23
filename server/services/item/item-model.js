'use strict';

// item-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// do not add any kind of validation here 
const itemSchema = new Schema({
  itemDescription: { type: String},
  menuCategory: { type: String},  
  sideIds:  { type: [String]},
  upsellIds: { type: [String]},  
  tags: { type: [String]},
  itemPrice: { type: String}, 
  itemImageURL:  { type: String}, 
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

const itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;
