"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const fs = require("fs");
const users = require("./MOCK_DATA.json");
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/api/users", (req, res) => {
    return res.json(users);
});
app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push(Object.assign(Object.assign({}, body), { id: users.length + 1 }));
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
        return res.json({ id: users.length });
    });
});
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const data = users.find((u) => u.id === id);
    if (!data) {
        return res.json("User not found");
    }
    return res.json(data);
});
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    let userIndex = users.findIndex((u) => u.id === id);
    users[userIndex] = Object.assign(Object.assign({}, body), { id: userIndex + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json(users[userIndex]);
    });
});
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const filteredUser = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredUser), (err, data) => {
        return res.json(id);
    });
});
app.listen(8000, () => console.log("Server is listening on port 8000"));
