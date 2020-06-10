//jshint esversion: 6
//Connects to a MongoDB server
//Endpoints for Get, Post, and Delete requests

// initialize

const
  port = 8888,
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  dbURL = 'mongodb://127.0.0.1:27017',
  MongoClient = require('mongodb').MongoClient,
  client = new MongoClient(dbURL),
  dbName = 'phonebookDB',
  collName = 'phonebook';

let db, col, db_length = 0;

MongoClient.connect(dbURL, {
  useNewUrlParser: true
}, (err, client) => {
  if (err) return console.log(err)
  // Storing a reference to the database so you can use it later
  db = client.db(dbName);
  col = db.collection(collName);
  console.log(`Connected MongoDB: ${dbURL}`)
  console.log(`Database: ${dbName}`)
})

//if the client directory contains an "index.html" web page
//  it will be displayed as the default document
app.use(express.static(__dirname + "/client"));

// Parse data from incoming Post requests
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// enable CORS
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
});

// endpoint to Get all tel numbers
app.get('/telnums', (req, res) => {
  db.collection(collName).find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    res.status(200).send({
      success: 'true',
      message: 'tel numbers retrieved successfully',
      tel_nums: result
    })
    //mongoDBclient.close();
  })
});

//endpoint to get a single tel number
//Examples: /telnum/1, /telnum/7, /telnum/11, ...
app.get('/telnum/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  db.collection(collName).findOne({
    "_id": id
  }, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).send({
      status_code: 200,
      message: ((result)?result:'document not found')
    })
  });
});


//Endpoint to add a tel number
app.post('/addnum', (req, res) => {
  // Insert a single document
  let telnum = {
    _id: db_length += 1,
    name: req.body.name,
    number: req.body.number
  }

  db.collection(collName).insertOne(telnum)
    .then(result => {
      //console.log(`record inserted ${result}`)
      return res.status(201).send({
        status_code: 200,
        message: 'Telephone Number added successfully',
        telnum
      })
    })
    .catch(error => console.error(error))
})

//Endpoint to Delete a single tel number
//Examples: /deletenum/1, /deletenum/7, /deletenum/11, ...
app.delete('/deletenum/:id', (req, res) => {
const id = parseInt(req.params.id);
  db.collection(collName).deleteOne({
    "_id": id
  }, function(err, obj) {
    if (err) throw err;
    //number of documents deleted
    console.log(obj.result.n + " document(s) deleted");
  });

  return res.status(200).send({
    status_code: 200,
    message: "Telephone number deleted",
  })
});

//Endpoint to Delete all tel numbers
app.delete('/deletenums', (req, res) => {
  db.collection(collName).deleteMany({}, function(err, obj) {
    if (err) throw err;
    //number of documents deleted
    console.log(obj.result.n + " document(s) deleted");
  });

  return res.status(200).send({
    status_code: 200,
    message: "phonebook collection is empty"
  })
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
