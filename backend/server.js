const express = require('express')
require('dotenv').config()
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors')

dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passkey';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors());

client.connect();


app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords')
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Post API
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords')
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
})

//delete API
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords')
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
})
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})