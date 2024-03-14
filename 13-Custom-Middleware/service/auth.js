"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.setUser = void 0;
const jwt = require("jsonwebtoken");
function setUser(user) {
    return jwt.sign(user, process.env.SECRET_KEY);
}
exports.setUser = setUser;
function getUser(token) {
    if (!token)
        return null;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    }
    catch (err) {
        console.error("JWT Verification Error:", err.message);
        return null;
    }
}
exports.getUser = getUser;
