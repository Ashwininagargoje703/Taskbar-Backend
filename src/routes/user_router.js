const express = require("express");
const { registerUser, loginUser } = require("../controllers/user_controller");

const app = express.Router();

app.post("/register", registerUser);
app.post("/login", loginUser);

module.exports = app;
