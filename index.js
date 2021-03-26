const express = require('express');
const bodyParser = require('express')

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const password = ''
const uri = "mongodb+srv://iamuser:user626@cluster0.ctgcy.mongodb.net/programingdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


client.connect(err => {
  const productCollection = client.db("programingdb").collection("codingfun");

  app.get('/products', (req, res) => {
    productCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.get('/product/:id', (req, res) => {
    productCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      })
  })

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
      .then(result => {
        console.log('data added successfully');
        res.redirect('/');
      })
  })

   app.patch('/update/:id', (req, res) => {
    productCollection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set: {price: req.body.price, quantity: req.body.quantity}
    })
    .then (result => {
      res.send(result.modifiedCount > 0)
    })
  })

  //   client.close();

  app.delete('/delete/:id', (req, res) => {
    productCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
  })
});


app.get('/', (req, res) => {
  // res.send("hello I am working")
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000)