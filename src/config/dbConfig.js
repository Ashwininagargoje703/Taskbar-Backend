const mongoose = require("mongoose");
require("dotenv").config();

const connection = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/tasklist");
};

module.exports = connection;
