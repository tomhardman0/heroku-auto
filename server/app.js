if (process.env.NODE_ENV !== 'production') {
		require('dotenv').config();
}

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// clients and config
const Heroku = require('./clients/heroku');
const herokuConfig = require('./config/heroku');
app.locals.clients = {
		heroku: new Heroku(herokuConfig)
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'dist')));
require('./routes')(app);
app.set('views', path.join(__dirname, '..', 'client', 'content', 'views'));
app.set('view engine', 'jade');

app.locals.name = process.env.APP_NAME;

const port = process.env.PORT || process.env.NODE_PORT || 3500;
app.listen(port, () => {
		console.log(`Greater Than Design now running on ${port}`);
});
