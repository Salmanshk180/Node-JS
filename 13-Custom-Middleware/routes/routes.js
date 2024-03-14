"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const login_1 = require("../controllers/login");
// import { addURL } from "../controllers/url";
exports.router = express_1.default.Router();
exports.router.post("/users", auth_1.handleAuthentication);
exports.router.post("/login", login_1.handleLogin);
// router.post("/url", addURL);
// router.get("/", handleGetUsers);
