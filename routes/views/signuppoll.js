const keystone = require('keystone');
const heroku = keystone.serviceClients.heroku;

const signUpPollRoute = (req, userRes) => {
    
    options['url'] = `${process.env.HEROKU_API_BASE}/app-setups/${req.params.id}`



    request(options, (err, res, body) => {
        userRes.send(body);
    });
};

exports = module.exports = signUpPollRoute;
