const keystone = require('keystone');
const request = require('request');

let baseHeaders = {
  'Accept': 'application/vnd.heroku+json; version=3',
  'Authorization': `Bearer ${process.env.HEROKU_API}`
};

let options = {
  headers: baseHeaders,
  json: true
};

const signUpPollRoute = (req, userRes) => {
    options['url'] = `${process.env.HEROKU_API_BASE}/app-setups/${req.params.id}`
    options['method'] = 'GET';

    request(options, (err, res, body) => {
        userRes.send(body);
    });
};

exports = module.exports = signUpPollRoute;
