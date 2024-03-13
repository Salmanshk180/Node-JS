"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
exports.users = express_1.default.Router();
const data = require("../users.json");
exports.users.get("/users", (req, res) => {
    return res.status(200).json(data);
});
