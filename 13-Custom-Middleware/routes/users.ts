import express from "express";

export const users = express.Router();
const data = require("../users.json");
users.get("/users", (req, res) => {
  return res.status(200).json(data);
});
