'use strict';

const service = require('feathers-mongoose');
const item = require('./item-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: item,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/items', service(options));

  // Get our initialize service to that we can bind hooks
  const itemService = app.service('/items');

  // Set up our before hooks
  itemService.before(hooks.before);

  // Set up our after hooks
  itemService.after(hooks.after);
};
