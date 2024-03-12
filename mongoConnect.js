const { MongoClient } = require("mongodb");
// require("dotenv").config();

// const connectionString =
//   process.env.ATLAS_DATABASE || process.env.COMPASS_DATABASE;
const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectString = `mongodb+srv://Testserver:${password}@devcluster.4n9t8fi.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`;
const client = new MongoClient(connectString);

let conn;
try {
  conn = await client.connect();
  console.log("Connection established");
} catch (e) {
  console.error(e);
}

let db = conn.db("test_naija");
module.exports = db;

// async function connectToMongoDB() {
//   const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//     return client.db("Naija01"); // Return the database object
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// }

// module.exports = connectToMongoDB;
