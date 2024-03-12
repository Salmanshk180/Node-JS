"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generateUniqueId = require("generate-unique-id");
const fs = require("fs");
const app = (0, express_1.default)();
const urlData = require("./URL_DATA.json");
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.post("/api/url", (req, res) => {
    const { url } = req.body;
    const shortURL = generateUniqueId({ length: 4 });
    urlData.push({ originalURL: url, shortURL });
    fs.writeFile("./URL_DATA.json", JSON.stringify(urlData), (err, data) => {
        return res.json("url entered");
    });
});
app.get("/api/:url", (req, res) => {
    const url = String(req.params.url);
    console.log(url);
    const data = urlData.find((u) => u["shortURL"] == url);
    return res.redirect(data.originalURL);
});
app.listen(8000, () => console.log("Server listening on port:8000"));
