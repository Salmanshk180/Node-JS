import express from "express";
const generateUniqueId = require("generate-unique-id");
const fs = require("fs");
const app = express();

const urlData = require("./URL_DATA.json");

interface urlType {
  originalURL: string;
  shortURL: string;
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/url", (req, res) => {
  const { url } = req.body;
  const shortURL = generateUniqueId({ length: 4 });
  urlData.push({ originalURL: url, shortURL });
  fs.writeFile(
    "./URL_DATA.json",
    JSON.stringify(urlData),
    (err: NodeJS.ErrnoException, data: Buffer) => {
      return res.json("url entered");
    }
  );
});

app.get("/api/:url", (req, res) => {
  const url = String(req.params.url);
  console.log(url);
  const data: urlType = urlData.find((u: urlType) => u["shortURL"] == url);
  return res.redirect(data.originalURL);
});

app.listen(8000, () => console.log("Server listening on port:8000"));
