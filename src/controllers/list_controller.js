const UserModel = require("../models/user_model");
const ListModel = require("../models/list_model");
const ListItemModel = require("../models/list_items_model");

async function createList(req, res) {
  try {
    let { listName, username, lists } = req.body;
    let user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "user not found!" });
    }
    let list = await ListModel.findOne({
      $and: [{ listName: listName }, { listBy: username }],
    });
    if (list) {
      return res.status(409).json({ msg: "list already exists!" });
    }
    list = await ListModel.create({ listName, listBy: username });
    let modifiedLists = lists.map((item) => {
      return {
        ...item,
        itemOf: list._id,
      };
    });
    let itemInserted = await ListItemModel.insertMany(modifiedLists);
    res.json({ msg: "created", list, itemInserted });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

async function getList(req, res) {
  try {
    let { username } = req.params;
    let allLists = await ListModel.aggregate([
      {
        $match: {
          listBy: username,
        },
      },
      {
        $lookup: {
          from: "list_items",
          localField: "_id",
          foreignField: "itemOf",
          as: "items",
        },
      },
    ]);
    res.json({ allLists });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

async function completeListItem(req, res) {
  try {
    let { listItemId } = req.body;
    let listItem = await ListItemModel.findOne({ _id: listItemId });
    listItem = {
      ...listItem._doc,
      isCompleted: !listItem.isCompleted,
    };
    await ListItemModel.findOneAndUpdate({ _id: listItemId }, listItem);
    res.json({ msg: "edited" });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

module.exports = { createList, getList, completeListItem };
