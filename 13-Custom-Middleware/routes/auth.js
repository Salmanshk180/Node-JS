"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const fs = require("fs");
const data = require("../users.json");
exports.auth = express_1.default.Router();
exports.auth.post("/users", (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (!email) {
        return res.status(404).json({ error: "Please enter a email" });
    }
    if (!password) {
        return res.status(404).json({ error: "Please enter a password" });
    }
    if (!emailRegex.test(email)) {
        return res.status(401).json({ error: "Please enter a valid email" });
    }
    if (!passwordRegex.test(password)) {
        return res.status(401).json({
            error: "Password should contain at least one lowercase alphabet,one uppercase alphabet,one numeric value,and total length must be in the range [8-15]",
        });
    }
    const id = (0, uuid_1.v4)();
    const userExist = data.find((user) => user.email === email);
    if (userExist) {
        return res.status(401).json({ error: "User Already Exist" });
    }
    data.push({ id: id, email, password });
    fs.writeFile("./users.json", JSON.stringify(data), (error, data) => {
        if (error) {
            return res.status(500).json({ error: error });
        }
        else {
            return res.status(201).json({ Status: "User Created" });
        }
    });
});
