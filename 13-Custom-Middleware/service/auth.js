"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.setUser = void 0;
const jwt = require("jsonwebtoken");
const { secret_key } = require("../controllers/key");
function setUser(user) {
    return jwt.sign(user, secret_key);
}
exports.setUser = setUser;
function getUser(token) {
    if (!token)
        return null;
    try {
        const decoded = jwt.verify(token, secret_key);
        return decoded;
    }
    catch (err) {
        console.error("JWT Verification Error:", err.message);
        return null;
    }
}
exports.getUser = getUser;
