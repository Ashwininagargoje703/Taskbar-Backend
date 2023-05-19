const mongoose = require("mongoose");

const ListItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    itemOf: { type: mongoose.Schema.Types.ObjectId, ref: "list" },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ListItemModel = mongoose.model("list_item", ListItemSchema);

module.exports = ListItemModel;
