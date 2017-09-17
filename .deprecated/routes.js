'use strict';

const User = require('./fetchUser');

const SOCIAL = ['twitter', 'facebook', 'instagram'];

const headers = {
  'Access-Control-Allow-Origin': '*',
  //'Access-Control-Allow-Origin': 'http://socialboard.host22.com',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const home = (request, response) => {
  if (request.url === '/') {
    response.end('Add social network and user ID after backslash in URL.');
  }
};

const user = (request, response) => {
  const splitedURL = request.url.slice(1).split('/');
  if (splitedURL.length !== 2) {
    response.writeHead(404, 'Inappropriate format');
    response.end('Inappropriate format. Use this: {social_network}/{user_id}');
  }

  const social = splitedURL[0];
  const id = splitedURL[1];

  if (SOCIAL.indexOf(social) < 0) {
    response.writeHead(404, 'Inappropriate social network');
    response.end(`"${social}" is not an appropriate social network.`);
  }

  if (!isNaN(id)) {
    const user = new User(social, id);
    try {
      const strUser = JSON.stringify(user);
      response.writeHead(200, headers);
      response.end(strUser);
    }
    catch(err) {
      response.end('Error while creating JSON.');
    }
  }
  else {
    response.writeHead(404, 'Inappropriate URL');
    response.end('URL is not a number.');
  }
};

module.exports.home = home;
module.exports.user = user;
