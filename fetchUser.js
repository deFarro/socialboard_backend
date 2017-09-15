'use strict';

const { NAMES, LAST_NAMES } = require('./names');

const rand = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const createPostsCalendar = (size) => {
  let calendar = [];
  for (let i = 0; i < size; i++) {
    calendar.push(randomDate(new Date(2016, 0, 1), new Date()));
  }
  return calendar;
}

const mapPosts = (calendar, period) => {
  const gap = period * 1000 * 60 * 60 * 24;
  const point = new Date().getTime() - gap;
  return calendar.filter(date => date.getTime() >= point);
}

const mapPostsCalendar = (calendar, range = 12, now = new Date()) => {
  const postsPerMonth = [];
  const calendarWithDates = calendar.map(date => new Date(date));
  const filtered = calendarWithDates.filter(date => (now.getTime() - date.getTime()) < (365 * 24 * 60 * 60 * 1000));

  for (let i = range - 1; i >= 0 ; i--) {
    const currentMonth = now.getMonth() - i >= 0 ? now.getMonth() - i : now.getMonth() - i + 12;
    // Ignore same month year ago
    if (i === 0) {
      postsPerMonth.push(filtered.filter(date => date.getMonth() === currentMonth && date.getYear() === now.getYear()).length);
      continue;
    }
    postsPerMonth.push(filtered.filter(date => date.getMonth() === currentMonth).length);
  }
  return postsPerMonth;
}

class User {
  constructor(social, id) {
    this.social = social;
    this.id = id;
    this.name = `${NAMES[rand(0, 2736)]} ${LAST_NAMES[rand(0, 999)]}`
    this.posts = rand(1, 200);
    this.friends = rand(1, 2000);
    this.likes = rand(50, 2000);
    this.comments = rand(10, 200);
    this.reposts = rand(50, 10000);
    this.postsCalendar = createPostsCalendar(this.posts);
    this.postsInLastMonth = mapPosts(this.postsCalendar, 30).length;
    this.postsInLastWeek = mapPosts(this.postsCalendar, 7).length;
    this.postsMap = mapPostsCalendar(this.postsCalendar);
  }
}

module.exports = User;
