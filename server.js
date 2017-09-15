'use strict';

// Libs
const http = require('http');

// Files
const routes = require('./routes');

http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');
  routes.home(request, response);
  routes.user(request, response);
})
  .listen(8080);

console.log('serving...');
