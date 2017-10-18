var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

var http = require('http');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/' , function(req, res) {
  console.log(req.query);

  var term = encodeURIComponent(req.query.term);

  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

  http.get(url, function(response) {

    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d) {
      body += d; 
    });

    response.on('end', function() {
      var parsed = JSON.parse(body);
      res.render('home', {gifs: parsed.data});
    });
  });
});

app.get('/hello-world', function(req, res) {
  res.send('Hello World SHIFT PLUS CHANGE');
});

app.get('/hello-gif', function(req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
  res.render('hello-gif', {gifUrl: gifUrl});
});

app.get('/prefectures', function(req, res) {

  var request = require('request');

  var url = "";

  var headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': 'uIsUR6bTsSITfIn81rV0L8fKmNtTdk0p1u3oYyBD'
  }

  var options = {
    method: 'GET',
    url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    headers: headers,
    json: true,
  };

  request(options, function(error, response, body) {
    if(error) throw new Error(error);

    res.render('prefectures', {result: body.result});
  });

});

app.listen(3000, function() {
  console.log('TEST NODEJS');
});
