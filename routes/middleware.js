const _ = require('lodash');

/**
	Initialises the standard view locals
*/
exports.initLocals = (req, res, next) => {
	res.locals.user = req.user;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = (req, res, next) => {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
