import express from "express";
import { addURL } from "../controllers/url";

export const urlRouter = express.Router();
let data = require("../urls.json");

urlRouter.post("/", addURL);
urlRouter.get("/", (req, res) => {
  if (data.length === 0) {
   return res.render("home", { urls: [], newURL: "No Data" });
  }
  return res.render("home", { urls: data, newURL: data[data.length - 1].shortURL, originalURL: data[data.length - 1].originalURL });
});
