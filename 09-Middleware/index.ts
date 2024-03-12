import express from "express";
const users = require("./MOCK_DATA.json");
const app = express();

app.use((req, res, next) => {
  req.body = "hello world";
  console.log("Middleware 1");
  next();
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.listen(8000, () => console.log("Server listening on port 8000"));
