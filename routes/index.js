'use strict';

// Libs
const express = require('express');

// Files
const User = require('../data/fetchUser');
const SOCIAL = ['twitter', 'facebook', 'instagram'];
const headers = {
  //'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Origin': 'http://socialboard.host22.com',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Add social network and user ID after backslash in URL: /{social_network}/{user_id}')
    .end();
});

router.use('/:social/:id', (req, res, next) => {
  const social = req.params.social;
  const id = parseInt(req.params.id);

  // Check if social and id is inserted and if id is a number (not a NaN)
  if (!social || !id) {
    res.status(404)
      .send('Inappropriate format. Follow this pattern: /{social_network}/{user_id}')
      .end();
  }

  else if (SOCIAL.indexOf(social) < 0) {
    res.status(404)
      .send(`"${social}" is not an appropriate social network. Expected: 'twitter', 'facebook' or 'instagram'`)
      .end();
  }

  else {
    const user = new User(social, id);
    try {
      const strUser = JSON.stringify(user);
      res.status(200)
        .set(headers)
        .send(strUser)
        .end();
    }
    catch(err) {
      err.status = 500;
      next(err);
    }
  }
});

module.exports = router;
