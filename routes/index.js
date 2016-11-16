const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initLocals);

const routes = {
	views: importRoutes('./views'),
};

exports = module.exports = (app) => {
	app.get('/', routes.views.index);
	app.post('/signup', routes.views.signup);
};
