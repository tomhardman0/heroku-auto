const keystone = require('keystone');
const heroku = keystone.serviceClients.heroku;

const signUpRoute = (req, res) => {
	const envOverrides = {
		'APP_NAME': 'an app name',
		'USER_EMAIL': req.body.email,
		'APP_INIT_PASSWORD': req.body.password
    };

    heroku.signUp(envOverrides)
          .then((body) => {
              console.log(body)
          });
};

exports = module.exports = signUpRoute;
