"use strict";
// service/redirectToLogin.ts
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
exports.redirectToLogin = void 0;
const auth_1 = require("./auth");
function redirectToLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!userToken) {
            return res.redirect("/api/login");
        }
        const user = (0, auth_1.getUser)(userToken);
        console.log(user);
        if (!user) {
            return res.redirect("/api/login");
        }
        req.user = user;
        next();
    });
}
exports.redirectToLogin = redirectToLogin;
