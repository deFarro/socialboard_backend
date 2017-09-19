'use strict';

// Libs
const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;
const router = require('./routes');
const app = express();

const url = 'mongodb://heroku_f4g252d2:e7ini3d781fpdb9go92l908gbi@ds139884.mlab.com:39884/heroku_f4g252d2';

mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

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
