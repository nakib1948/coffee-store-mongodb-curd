const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion,ObjectId } = require("mongodb");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxayaa3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeeCollection = client.db("coffeeDB").collection("coffee");

    app.get("/coffee", async (req, res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/coffee/:id',async(req,res)=>{
        const id=req.params.id;
        const query = {_id:new ObjectId(id)}
        const user=await coffeeCollection.findOne(query)
        res.send(user)
       })

    app.post("/coffee", async (req, res) => {
      const newCoffee = req.body;
      const result = await coffeeCollection.insertOne(newCoffee);
      res.send(result);
      console.log(newCoffee);
    });
    app.put('/coffee/:id',async(req,res)=>{
        const id=req.params.id
       
        const coffee=req.body
        const filter={_id:new ObjectId(id)}
        const options={upsert:true}
        const updatedCoffee={
          $set:{
            name:coffee.name,
            quantity: coffee.quantity,
            supplier: coffee.supplier,
            taste: coffee.taste,
            category: coffee.category,
            details: coffee.details,
            photo: coffee.photo,
          }
        }
        const result=await coffeeCollection.updateOne(filter,updatedCoffee,options)
        res.send(result)
    
       })

    app.delete('/coffee/:id',async(req,res)=>{
        const id=req.params.id
        const query={_id: new ObjectId(id)}

        const result=await coffeeCollection.deleteOne(query)
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
   
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Simple curd is running");
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
