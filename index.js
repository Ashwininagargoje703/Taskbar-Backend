const express = require("express");
const cors = require("cors");
const connection = require("./src/config/dbConfig");
const user_router = require("./src/routes/user_router");
const list_router = require("./src/routes/list_router");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", user_router);
app.use("/list", list_router);

app.get("/", (req, res) => {
  res.json({ msg: "hello, from the other side" });
});

app.listen(PORT, async () => {
  await connection();
  console.log(`server started at http://localhost:${PORT}`);
});
