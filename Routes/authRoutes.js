const express  = require("express");
const routes = express.Router();
const {signup, Login} = require("../Controllers/authController");


routes.post("/signup" , signup);
routes.get("/login" , Login);

module.exports = routes ;