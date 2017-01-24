const homeRoute = (app) => {
	app.get('/', (req, res) => {
		res.render('', {
			'title': app.locals.name
		})
	});
};

exports = module.exports = homeRoute;
