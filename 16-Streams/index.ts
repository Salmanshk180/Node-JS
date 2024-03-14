import express from "express";
const fs = require("fs");
const app = express();
const status = require("express-status-monitor-plus");
app.use(status());
app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.json", "utf-8");
  stream.on("data", (chunk: Buffer) => {
    res.write(chunk);
  });
  stream.on("end", () => res.end());
});
app.listen(9000, () => console.log("Server is listening on 9000"));
