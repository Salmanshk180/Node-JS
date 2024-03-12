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
    if (!body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title) {
        return res
            .status(400)
            .json({ messgae: "Please enter credentials properly" });
    }
    users.push(Object.assign(Object.assign({}, body), { id: users.length + 1 }));
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
        return res
            .status(201)
            .json({ message: "User Created", id: users.length });
    });
});
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const data = users.find((u) => u.id === id);
    if (!data) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(data);
});
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    if (body == null) {
        return res.status(400).json({ message: "Please Enter Credentials" });
    }
    let userIndex = users.findIndex((u) => u.id === id);
    if (users[userIndex] == null) {
        return res.status(404).json({ message: "User not found" });
    }
    users[userIndex] = Object.assign(Object.assign(Object.assign({}, users[userIndex]), body), { id: userIndex + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(200).json(users[userIndex]);
    });
});
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!users.find((u) => u.id === id)) {
        return res.status(404).json({ message: "User not found" });
    }
    const filteredUser = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredUser), (err, data) => {
        return res.status(200).json(id);
    });
});
app.listen(8000, () => console.log("Server is listening on port 8000"));
