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
  dbName = 'todoDB',
  collName = 'todo';

let db, col, key = 0;

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

// endpoint to Get all comments
app.get('/todos', (req, res) => {
  db.collection(collName).find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    res.status(200).send({
      success: 'true',
      message: 'comments retrieved successfully',
      comments: result
    })
  })
});

//endpoint to get a single comment
app.get('/gettodo/:data', (req, res, next) => {
  const data = req.params.data;

  db.collection(collName).findOne({
    "data": data
  }, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).send({
      status_code: 200,
      message: ((result) ? result : 'comment not found')
    })
  });
});


//Endpoint to add a comment
app.post('/addtodo', (req, res) => {
  // Insert a single document
  let comment = {
    data: req.body.data
  }

  db.collection(collName).insertOne(comment)
    .then(result => {
      console.log(`record inserted ${result}`)
      return res.status(201).send({
        status_code: 200,
        message: 'Comment added successfully',
        comment
      })
    })
    .catch(error => console.error(error))
})

//Endpoint to Delete a single comment
app.post('/deletecomment/:data', (req, res) => {
  const data = req.params.data;
  console.log(data)
  db.collection(collName).deleteOne({
    "data": data
  }, function(err, obj) {
    if (err) throw err;
    //number of documents deleted
    console.log(obj.result.n + " document(s) deleted");
  });

  return res.status(200).send({
    status_code: 200,
    message: "comment deleted",
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
