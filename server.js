const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const app = express();
const compiler = webpack(config);

var ShelterDB = require('./db/ShelterDB.js');
var db = new ShelterDB('mongodb://localhost:27017', 'sheltermap');

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

app.get('/test', async function(req, res) {
  console.log("Testing received");
  res.status(200).send("test");
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
});

app.post('/shelters', async function(request, response) {
  console.log("Client requesting shelters info");
  db.getShelters().then((res) => {
    var result = {};
    console.log(res);
    res.forEach(shelter => {
      result[shelter._id] = shelter;
    });
    response.status(200).send(JSON.stringify(result));
  })
});

app.post('/history', async function(request, response) {
  console.log("Client requesting shelters stats");
  db.getStats(request.query.shelterid).then((res) => {
    var result = {};
    res.forEach(stat => {
      result[stat._id] = stat;
    });
    response.status(200).send(JSON.stringify(result));
  })
});

app.post('/newshelter', async function(request, response) {
  console.log("Client submitting new shelter");
  db.addShelter(request.body).then((res) => {
    var result = {};
    res.forEach(stat => {
      result[stat._id] = stat;
    });
    response.status(200).send(JSON.stringify(result));
  })
});

app.listen(process.env.PORT || 8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${process.env.PORT || 8080}`);
});
