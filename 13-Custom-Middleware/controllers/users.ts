import express from "express";

const users = require("../users.json");
export async function handleGetUsers(
  req: express.Request,
  res: express.Response
) {
  return res.status(200).json(users);
}
