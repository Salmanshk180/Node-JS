"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = require("fs");
const app = (0, express_1.default)();
const status = require("express-status-monitor-plus");
app.use(status());
app.get("/", (req, res) => {
    const stream = fs.createReadStream("./sample.json", "utf-8");
    stream.on("data", (chunk) => {
        res.write(chunk);
    });
    stream.on("end", () => res.end());
});
app.listen(9000, () => console.log("Server is listening on 9000"));
