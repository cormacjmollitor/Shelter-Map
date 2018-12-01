const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const app = express();
const compiler = webpack(config);

const dbGet = require('./db/helpers/get_data.js');
const dbPost = require('./db/helpers/post_data.js');

var cookieSession = require('cookie-session')
app.use(cookieSession({
  httpOnly: false,
  name: 'session',
  keys: ['qyjlsfjlon', 'tqbqaqbiop', 'bcjnhmspaz'],

  // Cookie Options - set expirty
  maxAge: 24 * 60 * 60 * 100000 // 24 hours
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('/db/spots', async function(req, res) {
  let bounds = JSON.parse(req.query.bounds);
  let starttime = req.query.starttime.slice(0, 10);
  let endtime = req.query.endtime.slice(0, 10);

  const results = await dbGet.getAvailableSpots(bounds, starttime, endtime);
  res.json(results);
})

app.get('/db/spots/user', async function(req, res) {
  let results = await dbGet.getUserSpots(req.session.user_id)
  if (results) {
    res.status(200).json(results)
  } else {
    res.status(404).send('Unable to retrienve any parking spots associated to user')
  }
})

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(process.env.PORT || 8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${process.env.PORT || 8080}`);
});
