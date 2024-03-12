import express from "express";
const users = require("./MOCK_DATA.json");
const app = express();

app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "salman");
  res.send(users);
  console.log(req.headers);
});

app.listen(8000, () => console.log("Server is listening on 8000"));
