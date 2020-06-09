//jshint esversion: 6
// this file goes in the phone-book directory, not client/javascripts

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
