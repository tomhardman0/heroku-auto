if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const path = require('path');
const express = require('express');
const app = express();

// clients and config
const Heroku = require('./clients/heroku');
const herokuConfig = require('./config/heroku');
const Contentful = require('./clients/contentful');
const contentfulConfig = require('./config/contentful');
app.locals.clients = {
	heroku: new Heroku(herokuConfig),
	contentful: new Contentful(contentfulConfig)
};

app.use('/assets', express.static(path.join(__dirname, 'dist')));
require('./routes')(app);
app.set('views', path.join(__dirname, 'content', 'views'));
app.set('view engine', 'pug');

app.locals.name = process.env.APP_NAME;

const port = process.env.PORT || process.env.NODE_PORT || 3500;
app.listen(port, () => {
	console.log(`Greater Than Design now running on ${port}`);
});
