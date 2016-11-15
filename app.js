if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const request = require('request');

let baseHeaders = {
  'Accept': 'application/vnd.heroku+json; version=3',
  'Authorization': `Bearer ${process.env.HEROKU_API}`
};

const options = {
  url: `${process.env.HEROKU_API_BASE}/app-setups`,
  headers: baseHeaders
};

const handleCreation = (err, res, body, expressRes) => {
  if (err) throw new Error(err);

  if (body.build && body.build.status === 'succeeded') {
    expressRes.send(body)
  } else if (body.status === 'pending')  {
    options.url = `${process.env.HEROKU_API_BASE}/app-setups/${body.id}`;
    options.method = 'GET';
    delete options.body;
    setTimeout(() => {
      request(options, (err,res,body) => handleCreation(err,res,body,expressRes));
    }, 1000);
  }
};

app.get('/', function(req, res) {
  res.send('Hello world');
});

app.get('/doit', function (req, expressRes) {

  options['json'] = true;
  options['method'] = 'POST';
  options['body'] = {
    'source_blob': {
      'url': `https://api.github.com/repos/tomhardman0/heroku-auto/tarball/master?access_token=${process.env.GIT_ACCESS_TOKEN}`,
      'checksum': null,
      'version': 1
    }
  };

  request(options, (err,res,body) => handleCreation(err,res,body,expressRes));
});

app.listen(process.env.PORT || process.env.NODE_PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});
