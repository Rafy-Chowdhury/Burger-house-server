const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzlxy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('err', err);
  const collection = client.db("burger").collection("iteams");
  app.get('/iteams', (req, res) => {
    collection.find()
    .toArray((err, iteams) => {
      res.send(iteams)
    })
  })


  app.post('/addFood', (req, res) => {
      const newEvent = req.body;
      console.log('adding: ', newEvent);
      collection.insertOne(newEvent)
      .then(result => {
        console.log(result.insertedCount)
        //console.log('inserted ' result.insertedCount)
        res.send(result.insertedCount > 0)

      })
  })

  // perform actions on the collection object
  //client.close();
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})