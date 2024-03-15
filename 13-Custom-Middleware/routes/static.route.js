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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticroute = void 0;
const express_1 = __importDefault(require("express"));
exports.staticroute = (0, express_1.default)();
const urls = require("../urls.json");
const users = require("../users.json");
exports.staticroute.get("/url", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.redirect("/login");
    const filterData = urls.filter((url) => { var _a; return url.createdBy === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); });
    return res.render("home", {
        urls: filterData,
        newUrl: filterData[filterData.length - 1].shortURL,
        originalURL: filterData[filterData.length - 1].originalURL,
    });
}));
exports.staticroute.get("/login", (req, res) => {
    return res.render("Login");
});
exports.staticroute.get("/signup", (req, res) => {
    return res.render("SignUp");
});
exports.staticroute.get("/admin/users", (req, res) => {
    return res.render("dashboard", { users: users });
});
