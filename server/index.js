'use strict';
require("babel-register")({
  "plugins": ["transform-object-rest-spread"]
});
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
