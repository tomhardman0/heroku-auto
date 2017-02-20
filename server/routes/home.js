const homeRoute = (app) => {
	app.get('/', async (req, res) => {
		res.render('index', {
			'title': app.locals.name
		});
	});
};

exports = module.exports = homeRoute;
