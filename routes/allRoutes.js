const express = require("express");

const signUp = require("../controllers/signUp");

const route = express.Router();

route.post("/api/users", signUp);

module.exports = route;
