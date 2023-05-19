const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    listName: { type: String, required: true },
    listBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ListModel = mongoose.model("list", ListSchema);

module.exports = ListModel;
