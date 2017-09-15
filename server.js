'use strict';

// Libs
const http = require('http');

// Files
const routes = require('./routes');

let port = process.env.PORT || 8080;

http.createServer((request, response) => {
  routes.home(request, response);
  routes.user(request, response);
})
  .listen(port);

console.log('serving...');
