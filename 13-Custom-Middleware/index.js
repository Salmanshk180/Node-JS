"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const login_1 = require("./routes/login");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", users_1.users);
app.use("/api", auth_1.auth);
app.use("/api", login_1.login);
app.listen(8000, () => console.log("Server is listening on port 8000"));
