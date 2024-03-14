import express from "express";
const generateUniqueId = require("generate-unique-id");
const urlData = require("../urls.json");
const fs = require("fs");
export async function addURL(req: express.Request, res: express.Response) {
  const { url } = req.body;  
  const token = req.cookies.token;
  const shortURL = generateUniqueId({ length: 4 });
  urlData.push({ originalURL: url, shortURL, createdBy: token });
  fs.writeFile(
    "./urls.json",
    JSON.stringify(urlData),
    (err: NodeJS.ErrnoException, data: Buffer) => {
      return res.redirect("/api/url");
    }
  );
}
