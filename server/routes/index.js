const home = require('./home');
const signUp = require('./signup');
const signUpPoll = require('./signuppoll');
const signUpComplete = require('./signupcomplete');
const encryptRoute = require('./encrypt');

const routes = [
  home,
  signUp,
  signUpPoll,
  signUpComplete,
  encryptRoute
];

module.exports = (app) => routes.forEach(route => route(app));
