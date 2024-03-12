import express from "express";
const users = require("./MOCK_DATA.json");
const app = express();

app.use((req, res, next) => {
  req.body = "hello world";
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log(req.body);
  console.log("Middleware 2");
  next();
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.listen(8000, () => console.log("Server listening on port 8000"));
