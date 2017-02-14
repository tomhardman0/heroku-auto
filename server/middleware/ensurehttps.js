const isDev = process.env.NODE_ENV === 'development';
const ensureHttps = (req, res, next) => {
		const isHttps = req.headers['x-forwarded-proto'] === 'https';

		if (isHttps|| isDev) {
	  		return next();
		}
		res.redirect(`https://${req.hostname}${req.url}`);
};

exports = module.exports = ensureHttps;
