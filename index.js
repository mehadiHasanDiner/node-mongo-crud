const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const password = ''
const uri = "mongodb+srv://iamuser:user626@cluster0.ctgcy.mongodb.net/programingdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());


client.connect(err => {
  const collection = client.db("programingdb").collection("codingfun");
//   const product = {name: "modhu", price:25, quantity: 20};
//   collection.insertOne(product)
//   .then(result =>{
//       console.log('one product added');
//   })

//   console.log('database connected');

app.post("/addProduct", (req, res) => {
    const product =req.body;
    console.log(product);
})

//   client.close();
});


app.get('/', (req, res) => {
    // res.send("hello I am working")
    res.sendFile(__dirname + '/index.html');
}) 

app.listen(3000)