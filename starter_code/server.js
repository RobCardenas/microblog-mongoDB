// SERVER-SIDE JAVASCRIPT 

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore"),
    mongoose = require('mongoose');

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES

// Static file route(s)

// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});


mongoose.connect("mongodb://localhost/microblog");
var Post = require('./models/post');

app.get('/api/posts', function(req,res) {
  Post.find(function (err,posts) {
    res.json(posts);
  });
});

app.post('/api/posts', function(req,res) {
  var newPost = new Post({
    title: req.body.title,
    text: req.body.text
  });
  newPost.save(function (err, savedPost) {
    res.json(savedPost);
  })
});

app.get('/api/posts/:id', function (req, res) {

    //set the value of the id
    var targetId = req.params.id;
    //find correct post in the db by id
    Post.findOne({_id: targetId}, function (err, foundPost) {
      res.json(foundPost);
    });
  });

app.put('/api/posts/:id', function (req,res) {
  var targetId = req.params.id;
  Post.findOne({_id: targetId}, function(err, foundPost) {
    foundPost.title = req.body.title;
    foundPost.text = req.body.text;

    foundPost.save(function (err,savedPost) {
      res.json(savedPost);
    });
  });
});

// delete post
app.delete('/api/posts/:id', function (req, res) {
    //set the value of the desired id
    var targetId = req.params.id;
    //find the correct post in the db and remove it
    Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
      res.json(deletedPost);
    });
  });


// set server to localhost:3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});