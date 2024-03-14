"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addURL = void 0;
const generateUniqueId = require("generate-unique-id");
const urlData = require("../urls.json");
const fs = require("fs");
function addURL(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = req.body;
        const token = req.cookies.token;
        const shortURL = generateUniqueId({ length: 4 });
        urlData.push({ originalURL: url, shortURL, createdBy: token });
        fs.writeFile("./urls.json", JSON.stringify(urlData), (err, data) => {
            return res.redirect("/api/url");
        });
    });
}
exports.addURL = addURL;
