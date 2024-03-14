import express from "express";
import { addURL } from "../controllers/url";

export const urlRouter = express.Router();
const data = require("../urls.json")
urlRouter.post("/", addURL);
urlRouter.get("/", (req, res) => {
  res.render("home",{urls:data,newURL:data[data.length-1].shortURL});
});
