"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users = require("./MOCK_DATA.json");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    req.body = "hello world";
    console.log("Middleware 1");
    next();
});
app.use((req, res, next) => {
    console.log(req.body);
    console.log("Middleware 2");
    next();
});
app.get("/api/users", (req, res) => {
    return res.json(users);
});
app.listen(8000, () => console.log("Server listening on port 8000"));
