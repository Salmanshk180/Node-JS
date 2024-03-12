"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users = require("./MOCK_DATA.json");
const app = (0, express_1.default)();
app.get("/api/users", (req, res) => {
    res.setHeader("X-myName", "salman");
    res.send(users);
    console.log(req.headers);
});
app.listen(8000, () => console.log("Server is listening on 8000"));
