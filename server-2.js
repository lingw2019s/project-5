//jshint esversion: 6

// simple Express.js RESTful API

// initialize
const
  port = 8888,
  express = require('express'),
  app = express();

// /hello/ route, an HTTP GET request
app.get('/hello/:name?', (req, res) =>
  res.json(
    { message: `Hello ${req.params.name || 'world'}!` }
  )
);

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
