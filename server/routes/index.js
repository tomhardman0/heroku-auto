const home = require('./home');
const signUp = require('./signup');
const signUpPoll = require('./signuppoll');
const signUpComplete = require('./signupcomplete');

const routes = [
  home,
  signUp,
  signUpPoll,
  signUpComplete
];

module.exports = (app) => routes.forEach(route => route(app));
