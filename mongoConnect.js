const { MongoClient } = require("mongodb");
require("dotenv").config();
const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectString =
  `mongodb+srv://Testserver:${password}@devcluster.4n9t8fi.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster` ||
  `mongodb://localhost:27017/Naija01`;

const client = new MongoClient(connectString);

let database; // variable to store the reference to the database

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connection established");
    database = client.db("test_naija"); // assign the database object
  } catch (e) {
    console.error(e);
  }
}

// // Call the asynchronous function to establish the connection
connectToDatabase();

module.exports = {
  getDb: function () {
    return database;
  },
  getClient: function () {
    return client;
  },
};

// const mongoose = require("mongoose");
// require("dotenv").config();

// const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
// const connectString =
//   `mongodb+srv://Testserver:${password}@devcluster.4n9t8fi.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster` ||
//   `mongodb://localhost:27017/Naija01`;

// const mongooseConnection = () => {
//   return mongoose
//     .connect(connectString)
//     .then(() => {
//       console.log(`Connected to ${connectString}`);
//     })
//     .catch((err) => {
//       console.log(`Connection to ${connectString} failed ${err}`);
//     });
// };

// module.exports = mongooseConnection;
