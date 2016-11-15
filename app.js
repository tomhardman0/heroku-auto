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

app.get('/', function(req, res) {
  res.send('Hello world');
});

app.get('/doit', function (req, resp) {

  options['json'] = true;
  options['method'] = 'POST';
  options['body'] = {
    'source_blob': {
      'url': 'https://api.github.com/repos/tomhardman0/heroku-auto/tarball/master?access_token=${process.env.GIT_ACCESS_TOKEN}',
      'checksum': null,
      'version': 1
    }
  };

  request(options, (err, res, body) => {
    if (err) throw new Error(err);
    console.log(body);
    resp.send(body)
  });
});

app.listen(process.env.PORT || process.env.NODE_PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
