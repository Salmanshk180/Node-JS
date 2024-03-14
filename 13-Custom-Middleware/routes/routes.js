"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// routes/auth.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const login_1 = require("../controllers/login");
const data = require("../urls.json");
exports.router = express_1.default.Router();
exports.router.post('/signup', auth_1.handleAuthentication);
exports.router.post('/login', login_1.handleLogin);
exports.router.get("/api/:url", (req, res) => {
    const url = req.params.url;
    const findURL = data.find((r) => r.shortURL = url);
    if (findURL) {
        return res.redirect(findURL.originalURL);
    }
    else {
        return res.redirect("/");
    }
});
// router.post("/admin/users",handleGetUsers)
