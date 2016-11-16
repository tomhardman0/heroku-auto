const keystone = require('keystone');

const signUpRoute = (req, res) => {
	console.log(req.body);
	res.send(req.body);
};

exports = module.exports = signUpRoute;
