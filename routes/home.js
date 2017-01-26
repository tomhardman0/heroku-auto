const homeRoute = (app) => {
	const contentful = app.locals.clients.contentful;

	app.get('/', async (req, res) => {

		const entries = await contentful._getEntries();
		console.log(entries);
		res.render('index', {
			'title': app.locals.name
		});
	});
};

exports = module.exports = homeRoute;
