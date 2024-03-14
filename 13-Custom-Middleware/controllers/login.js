"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const auth_1 = require("../service/auth");
const data = require("../users.json");
var jwt = require("jsonwebtoken");
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const user = yield data.find((user) => user.email === email);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        const passwordValidate = user.password === password;
        if (!passwordValidate) {
            return res.status(401).json({ error: "Please check your password" });
        }
        const token = (0, auth_1.setUser)(user);
        res.cookie("token", token);
        return res.redirect("/api/url");
    });
}
exports.handleLogin = handleLogin;
