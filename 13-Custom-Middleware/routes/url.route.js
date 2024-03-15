"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRouter = void 0;
const express_1 = __importDefault(require("express"));
const url_1 = require("../controllers/url");
exports.urlRouter = express_1.default.Router();
let data = require("../urls.json");
exports.urlRouter.post("/", url_1.addURL);
exports.urlRouter.get("/", (req, res) => {
    if (data.length === 0) {
        return res.render("home", { urls: [], newURL: "No Data" });
    }
    return res.render("home", { urls: data, newURL: data[data.length - 1].shortURL, originalURL: data[data.length - 1].originalURL });
});
