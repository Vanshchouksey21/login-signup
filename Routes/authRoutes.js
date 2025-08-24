const express  = require("express");
const routes = express.Router();
const {signup} = require("../Controllers/authController");


routes.post("/signup" , signup);

module.exports = routes ;