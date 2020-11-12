var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.send('this is the homepage');
});
app.get('/login', function(req, res){
  res.render('login');
});
app.get('/inbox/:name', function(req, res){
  res.render('inbox', {person: req.params.name});
});
app.get('/404', function(req, res){
  res.sendFile('C:/Programming/JavaScript/Alphamail/rootfolder/404.html');
});


app.listen(3000);



/*
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
  console.log('request was made: ' + req.url);

  if(req.url === '/home' || req.url === '/'){
  res.writeHead(200, {'content-Type': 'text/html'});
  fs.createReadStream('C:/Programming/JavaScript/Alphamail/rootfolder/client.html', 'utf8').pipe(res);
} else {
  res.writeHead(404, {'content-Type': 'text/html'});
  fs.createReadStream('C:/Programming/JavaScript/Alphamail/rootfolder/404.html', 'utf8').pipe(res);
}
});

server.listen(3000, '127.0.0.1');
console.log('listening to port 3000');
*/
