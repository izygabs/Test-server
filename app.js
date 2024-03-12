const express = require("express");
const bodyParser = require("body-parser");
const db = require("./mongoConnect");
const port = 4000;
const app = express();
const cors = require("cors");

app.use(cors());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World, from Naija01");
});

app.post("/addUser", async (req, res) => {
  let collection = await db.collection("users");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  console.log("rreq" + req.body);
  res.send(result).status(204);
});

app.get("/getUsers", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection
    .find({})

    .toArray();
  res.send(results).status(200);
});

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});
