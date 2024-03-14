"use strict";
// app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redirectToLogin_1 = require("./service/redirectToLogin");
const routes_1 = require("./routes/routes");
const staticRoute_1 = require("./routes/staticRoute");
const urlRoute_1 = require("./routes/urlRoute");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/url", redirectToLogin_1.redirectToLogin, urlRoute_1.urlRouter);
app.use("/api/admin/users", redirectToLogin_1.redirectToLogin, staticRoute_1.staticroute);
app.use("/api", routes_1.router);
app.use("/api", staticRoute_1.staticroute);
app.listen(8000, () => console.log("Server is listening on port 8000"));
