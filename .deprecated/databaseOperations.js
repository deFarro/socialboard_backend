'use strict';

// Libs
const MongoClient = require('mongoodb').MongoClient

const url = 'mongodb://127.0.0.1:27017';

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log(err);
    db.close();
    return;
  }
  db.createCollection('facebook')
    .then(collection => collection.insert({name: 'John Doe', id: 22343243457, frieds: 2341}))
    .then(() => db.collection('facebook')
      .find({id: 27}).toArray()
      .then(user => console.log(`Gotcha! ${user[0].name}!`))
      .then(() => db.close())
    )
    .catch(err => console.log(err))
});
