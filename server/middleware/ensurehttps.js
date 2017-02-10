const isDev = process.env.NODE_ENV === 'development';
const ensureHttps = (req, res, next) => {
		if (req.headers['x-forwarded-proto'] === 'https' || isDev) {
	  		return next();
		}
		res.redirect(`https://${req.hostname}${req.url}`);
};

exports = module.exports = ensureHttps;
