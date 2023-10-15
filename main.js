const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./schemas/person.schema");

require("dotenv").config();

mongoose.set("strictQuery", false)

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
})

app.get("/persons", async (req, res) => {
  const persons = await Person.find({}) 

  res.send(persons)
});

app.get("/persons/:email", async (req, res) => {
  const person = await Person.findOne({
    email : req.params.email
  });

  res.send(person)
})

app.post("/persons", async (req, res) => {
  const { name, age, email } = req.body;

  const person = await Person.create({
    name,
    age,
    email
  });

  await person.save()

  res.send(person)
});

app.put("/persons/:email", async (req, res) => {
  const { name, age } = req.body;

  console.log(req.params.email)

  const person = await Person.updateOne({email : req.params.email}, {$set : {name : name, age : age}});

  console.log(person)

  res.send({
    message : "Updated"
  })
})

app.delete("/persons/:email", async (req, res) => {
  const email = req.params.email;

  await Person.findOneAndDelete({email : email}); 
  res.send({
    message : "Deleted"
  })
});

app.listen(process.env.PORT, async () => {
  const mongodbUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  mongoose.connect(mongodbUri,{ useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"));

  console.log(`Start Express server : use ${process.env.PORT}`);
});
