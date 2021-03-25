const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const password = ''
const uri = "mongodb+srv://iamuser:user626@cluster0.ctgcy.mongodb.net/programingdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


client.connect(err => {
  const productCollection = client.db("programingdb").collection("codingfun");
  app.get('/products', (req, res) => {
    productCollection.find({}).limit(4)
    .toArray ((err, documents) => {
      res.send(documents);
    })
  })

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
      console.log('data added successfully');
      res.send('success')
    })
  })

  //   client.close();
});


app.get('/', (req, res) => {
  // res.send("hello I am working")
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000)