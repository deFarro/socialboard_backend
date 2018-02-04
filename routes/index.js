'use strict';

// Libs
const express = require('express');

// Files
const User = require('../data/fetchUser');
const SOCIAL = ['twitter', 'facebook', 'instagram'];
const headers = {
  'Access-Control-Allow-Origin': '*',
  //'Access-Control-Allow-Origin': 'http://socialboard.host22.com, https://defarro.github.io',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};
const UserModel = require('../data/models');

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
  // Check if social input correct
  else if (SOCIAL.indexOf(social) < 0) {
    res.status(404)
      .send(`"${social}" is not an appropriate social network. Expected: 'twitter', 'facebook' or 'instagram'`)
      .end();
  }
  // In pre-fight app sends only headers
  else if (req.method === 'OPTIONS') {
    res.status(200)
      .set(headers)
      .end();
  }
  // All checks passed successfully
  else {
    // Check if there is a user with this ID in the database
    UserModel.findOne({id: id, social: social}, (err, user) => {
      if (err) {
        err.status = 500;
        next(err);
      }
      else {
        // If so, send it
        if (user) {
          sendUser(user, res, headers, next);
        }
        // If not, create and add to database
        else {
          const userToSave = new UserModel(new User(social, id));
          userToSave.save((err, user) => {
            if (err) {
              err.status = 500;
              next(err);
            }
            else {
              sendUser(user, res, headers, next);
            }
          })
        }
      }
    });
  }
});

const sendUser = (user, res, headers, next) => {
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

module.exports = router;
