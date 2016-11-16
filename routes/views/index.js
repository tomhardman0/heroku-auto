const keystone = require('keystone');

const indexRoute = (req, res) => {

	const view = new keystone.View(req, res);

	view.render('index', {
		'title': keystone.get('brand')
	});
};

exports = module.exports = indexRoute;
