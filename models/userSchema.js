const mongoose = require("mongoose");
// const { getDb } = require("../mongoConnect");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// // Method to save user to the database
// userSchema.methods.saveToDatabase = async function () {
//   try {
//     const collection = getDb().collection("users");
//     await collection.insertOne(this.toObject());
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports.User = mongoose.model("user", userSchema);
