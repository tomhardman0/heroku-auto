const home = require('./home');
const signUp = require('./signup');
const signUpPoll = require('./signuppoll');
const signUpComplete = require('./signupcomplete');
const encryptRoute = require('./encrypt');
const setCustomDnsRoute = require('./setcustomdns');

const routes = [
  home,
  signUp,
  signUpPoll,
  signUpComplete,
  setCustomDnsRoute,
  encryptRoute
];

module.exports = (app) => routes.forEach(route => route(app));
