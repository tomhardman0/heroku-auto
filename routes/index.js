const home = require('./home');
const signUp = require('./signup');
const signUpPoll = require('./signuppoll');

const routes = [
    home,
    signUp,
	signUpPoll
];

module.exports = (app) => {
	routes.forEach(route => route(app));
};
