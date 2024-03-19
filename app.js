const express = require("express");
const bodyParser = require("body-parser");
const mongooseConnection = require("./mongoConnect");
const port = 4000;
const app = express();
const cors = require("cors");
const route = require("./routes/allRoutes");

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(route);

app.get("/", (req, res) => {
  res.send("Hello World, from Naija01");
});

app.listen(port, async () => {
  await mongooseConnection();
  console.log(`Server is running on ${port}`);
});

// mongooseConnection.on("open", async () => {
//   // Using the 'open' event to start the server after the connection is established
//   app.listen(port, () => {
//     console.log(`Server is running on ${port}`);
//   });
// });

// mongooseConnection.on("error", (error) => {
//   console.error("MongoDB connection error:", error);
// });

// app.post("/addUser", async (req, res) => {
//   try {
//     let collection = await db.getDb().collection("users");
//     let newDocument = req.body;
//     newDocument.date = new Date();
//     let result = await collection.insertOne(newDocument);
//     console.log("req", req.body);
//     res.status(204).send(result);
//   } catch (error) {
//     console.error("Error adding user:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/getUsers", async (req, res) => {
//   let collection = await db.getDb().collection("users");
//   let results = await collection
//     .find({})

//     .toArray();
//   res.send(results).status(200);
// });
