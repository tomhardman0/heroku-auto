if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const path = require('path');
const express = require('express');
const app = express();

// Clients
const Heroku = require('./clients/heroku');
const Contentful = require('contentful').createClient({
	'space': process.env.CONTENTFUL_SPACE,
	'accessToken': process.env.CONTENTFUL_DELIVERY_TOKEN
});
app.locals.clients = {
	heroku: new Heroku(),
	contentful: Contentful
};

app.use('/assets', express.static(path.join(__dirname, 'dist')));
require('./routes')(app);
app.set('view engine', 'pug');

app.locals.name = process.env.APP_NAME;

const port = process.env.PORT || process.env.NODE_PORT || 3500;
app.listen(port, () => {
	console.log(`Greater Than Design now running on ${port}`);
});
