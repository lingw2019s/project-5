//jshint esversion: 6
// Adds endpoint for HTTP Post request

// initialize

const
  port = 8888,
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express();

/*
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
*/

//if the client directory contains an "index.html" web page
//  it will be displayed as the default document
app.use(express.static(__dirname + "/client"));

// Parse data from incoming Post requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// enable CORS
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
});

//Simple route handle to test a Post request endpoint
//test it with Postwoman.io or Postman app
app.post('/addnum', (req, res) => {
 const telnum = {
   name: req.body.name,
   number: req.body.number
 }
 return res.status(201).send({
   success: 'true',
   message: 'new number added',
   telnum
 })
});

// /hello/ route, an HTTP GET request
app.get('/hello/:name?', (req, res) =>
  res.json({
    message: `Hello ${req.params.name || 'world'}!`
  })
);

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
