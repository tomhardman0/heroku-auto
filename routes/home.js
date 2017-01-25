const homeRoute = (app) => {
	app.get('/', (req, res) => {
		res.render('index', {
			'title': app.locals.name
		})
	});
};

exports = module.exports = homeRoute;
