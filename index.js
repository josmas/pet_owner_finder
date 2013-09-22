var express = require('express');
var app = express();
var matchFinder = require('./tagFinder.js');

app.use(express.static(__dirname + '/public'));
var engines = require('consolidate');
app.engine('html', engines.hogan);

app.get('/', function(req, res){
  res.render('petownerfinder.html');
});

app.get('/results', function(req, res){
  console.log(req.query.tag);
  console.log(req.query.blogname);
  if (req.query.tag == '' || req.query.blogname == '') res.send("Oops! Something went wrong");
  else matchFinder.getBlogs(req.query.tag, req.query.blogname, function(blogData){res.render('results.jade', {data: blogData})});
});

app.get('/lala', function(req, res){
  res.render('lala.html');
});
app.get('/hello', function(req, res){
  res.send('Hello World');
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
