const keystone = require('keystone');
const request = require('request');

let baseHeaders = {
  'Accept': 'application/vnd.heroku+json; version=3',
  'Authorization': `Bearer ${process.env.HEROKU_API}`
};

let options = {
  url: `${process.env.HEROKU_API_BASE}/app-setups`,
  headers: baseHeaders,
  json: true
};

const signUpRoute = (req, userRes) => {
	options['method'] = 'POST';
	options['body'] = {
	  'source_blob': {
		'url': `https://api.github.com/repos/tomhardman0/greaterthan-design-template/tarball/master?access_token=${process.env.GIT_ACCESS_TOKEN}`,
		'checksum': null,
		'version': 1
	  },
	  'overrides': {
		  'env': {
			'APP_NAME': 'an app name',
			'USER_EMAIL': req.params.email,
			'APP_INIT_PASSWORD': req.params.password
		  }
	  }
	};

	request(options, (err, res, body) => {
		userRes.send(body);
	});
};

exports = module.exports = signUpRoute;
