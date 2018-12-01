//server.js
var app = require('./app');

var port = process.env.PORT || 8080;

var server = app.listen(port, function(){
    var host = server.address().address;
    console.log('Express server listening at http://%s:%s', host, port);
});

