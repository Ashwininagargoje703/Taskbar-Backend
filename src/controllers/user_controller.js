const UserModel = require("../models/user_model");

async function registerUser(req, res) {
  try {
    let { username, password } = req.body;
    let user = await UserModel.findOne({ username });
    if (user) {
      return res.status(409).json({ msg: "already registered" });
    }
    await UserModel.create({ username, password });
    res.json({ msg: "done" });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

async function loginUser(req, res) {
  try {
    let { username, password } = req.body;

    let user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: "user not found!", status: 404 });
    }

    if (user.password !== password) {
      return res.status(401).json({ msg: "incorrect password!", status: 401 });
    }

    res.json({ msg: "login successfull", token: "secure token", user });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

module.exports = { registerUser, loginUser };
