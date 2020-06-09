//jshint esversion: 6

// simple Express.js RESTful API

// initialize
const
  port = 8888,
  express = require('express'),
  app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

//if the client directory contains an "index.html" web page
//  it will be displayed as the default document
app.use(express.static(__dirname + "/client"));

// enable CORS
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
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
