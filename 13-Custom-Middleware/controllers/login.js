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
const constant_1 = require("../constants/constant");
const data = require("../users.json");
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if (!email) {
            return res
                .status(constant_1.HTTP_STATUS_CODES.NOT_FOUND)
                .json(constant_1.ERROR_MESSAGE._NotFound("Email"));
        }
        if (!password) {
            return res
                .status(constant_1.HTTP_STATUS_CODES.NOT_FOUND)
                .json(constant_1.ERROR_MESSAGE._NotFound("Passowrd"));
        }
        if (!emailRegex.test(email)) {
            return res
                .status(constant_1.HTTP_STATUS_CODES.BAD_REQUEST)
                .json(constant_1.ERROR_MESSAGE._Bad_Request);
        }
        if (!passwordRegex.test(password)) {
            return res
                .status(constant_1.HTTP_STATUS_CODES.BAD_REQUEST)
                .json(constant_1.ERROR_MESSAGE._Bad_Request);
        }
        const user = yield data.find((user) => user.email === email);
        if (!user) {
            return res
                .status(constant_1.HTTP_STATUS_CODES.NOT_FOUND)
                .json(constant_1.ERROR_MESSAGE._NotFound("User"));
        }
        const passwordValidate = user.password === password;
        if (!passwordValidate) {
            return res
                .status(constant_1.HTTP_STATUS_CODES.BAD_REQUEST)
                .json(constant_1.ERROR_MESSAGE._NotMatch("Password"));
        }
        const token = (0, auth_1.setUser)(user);
        res.cookie("token", token);
        return res.redirect("/api/url");
    });
}
exports.handleLogin = handleLogin;
