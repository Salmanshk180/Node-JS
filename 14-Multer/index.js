"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
const storage = multer_1.default.diskStorage({
    destination: function (request, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});
const uploads = (0, multer_1.default)({ storage: storage });
app.use("/uploads", express_1.default.static(path.join(__dirname, "uploads")));
app.get("/api", (req, res) => {
    res.render("home");
});
app.post("/upload", uploads.single("photo"), (req, res, next) => {
    res.redirect("/api");
});
app.listen(8000, () => console.log("Server is listening on port 8000"));
