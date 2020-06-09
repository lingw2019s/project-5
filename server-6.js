//jshint esversion: 6
//Adds Post data to db in server

// initialize

const
  port = 8888,
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  db =  [
     {
       "id": 1,
       "name": "Argus Filch",
       "number": "800-Hog-Wart"
     }
  ];

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

// endpoint to Get all tel numbers
app.get('/telnums', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'tel numbers retrieved successfully',
    tel_nums: db
  })
});

//Post request endpoint
//test it with Postman app
app.post('/addnum', (req, res) => {
  const telnum = {
    id: db.length + 1,
    name: req.body.name,
    number: req.body.number
  }
 db.push(telnum);  //add record to local db
 return res.status(201).send({
   success: 'true',
   message: 'Telephone Number added successfully',
   telnum
 })
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
