const express = require("express");
const {
  createList,
  getList,
  completeListItem,
} = require("../controllers/list_controller");

const app = express.Router();

app.post("/create-list", createList);
app.get("/get-list/:username", getList);
app.post("/update-list-item", completeListItem);

module.exports = app;
