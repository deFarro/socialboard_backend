'use strict';

// Libs
const express = require('express');

const port = process.env.PORT || 8080;

const app = express();
const router = require('./routes');

app.use(router);

// Catches all unexpexted routes
app.use((req, res, next) => {
  const err = new Error('Inappropriate format. Follow this pattern: /{social_network}/{user_id}');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status)
    .send(err.message)
    .end();
});

app.listen(port, () => console.log('serving...'));
