const express = require("express");
const bodyParser = require("body-parser");
const db = require("./mongoConnect");
const port = 4000;
const app = express();
const cors = require("cors");
// const route = require("./routes/allRoutes");

// app.use(cors());

// app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.use(route);

app.get("/", (req, res) => {
  res.send("Hello World, from Naija01");
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

app.post("/addUser", async (req, res) => {
  try {
    let collection = await db.getDb().collection("users");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    console.log("req", req.body);
    res.status(204).send(result);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/users", async (req, res) => {
  try {
    // const userExist = await db
    //   .getDb()
    //   .collection("users")
    //   .findOne({ email: req.body.email });

    // if (!userExist) {
    //   res.status(409).json({ message: "User already exists" });
    // }
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(value.password, salt)
    const collection = await db.getDb().collection("users");
    const newUser = req.body;
    const user = await collection.insertOne(newUser);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getUsers", async (req, res) => {
  let collection = await db.getDb().collection("users");
  let results = await collection
    .find({})

    .toArray();
  res.send(results).status(200);
});

// app.listen(port, async () => {
//   await mongooseConnection();
//   console.log(`Server is running on ${port}`);
// });

app.listen(port, function () {
  console.log("Server is listening at port:" + port);
});
