'use strict';

// Libs
const express = require('express');

// Files
const User = require('./fetchUser');

let port = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
  res.send('Add social network and user ID after backslash in URL.')
});

app.listen(port, () => console.log('serving...'));
