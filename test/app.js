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

app.listen(3000, function() {
  console.log('TEST NODEJS');
});
