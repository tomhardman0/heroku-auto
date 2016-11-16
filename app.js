if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const keystone = require('keystone');
const appInit = require('./init/new_admin');

let staticOptions = {};
if (process.env.NODE_ENV === 'production') {
	staticOptions['maxAge'] = 8640000000;
}

keystone.init({
	'name': 'Greater Than - Design',
	'brand': 'Greater Than - Design',
	'static': 'dist',
	'static options': staticOptions,
	'favicon': 'dist/images/favicon.ico',
	'views': 'content/views',
	'view engine': 'jade',
	'auto update': false,
	'session': true,
	'auth': true,
	'user model': 'User',
	'compress': true,
	// 'cloudinary config': process.env.CLOUNDINARY_URL,
	// 'cloudinary secure': true,
	// 'cloudinary folders': true
});

keystone.import('models');

keystone.set('locals', {
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	users: 'users',
});

keystone.set('port', process.env.PORT || process.env.NODE_PORT || 3500);
keystone.set('env', process.env.NODE_ENV || 'development');
keystone.set('mongo', process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.APP_NAME}`);
keystone.set('session store', 'mongo');

keystone.start();

// If no admin user exists in db, create one.
appInit.newAdmin();
