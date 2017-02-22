const isDev = process.env.NODE_ENV === 'development';
if (isDev) require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ensureHttps = require('./middleware/ensurehttps');
const port = process.env.PORT || process.env.NODE_PORT || 3500;

// clients and config
const Heroku = require('./clients/heroku');
const herokuConfig = require('./config/heroku');
const Postgres = require('./clients/postgres');
const postgresConfig = require('./config/postgres');
const Namecheap = require('./clients/namecheap');
const namecheapConfig = require('./config/namecheap');
app.locals.clients = {
	heroku: new Heroku(herokuConfig),
	postgres: new Postgres(postgresConfig),
	namecheap: new Namecheap(namecheapConfig)
};

// app.enable('trust proxy');
app.use(ensureHttps);
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'dist')));
require('./routes')(app);
app.set('views', path.join(__dirname, '..', 'client', 'content', 'views'));
app.set('view engine', 'jade');

app.locals.name = process.env.APP_NAME;

app.listen(port, () => console.log(`Junip now running on ${port}`));
