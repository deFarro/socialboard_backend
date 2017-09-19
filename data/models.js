'use strict';

// Libs
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  social: String,
  id: Number,
  name: String,
  posts: Number,
  friends: Number,
  likes: Number,
  comments: Number,
  reposts: Number,
  postsCalendar: [Date],
  postsInLastMonth: Number,
  postsInLastWeek: Number,
  postsMap: [Number]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
