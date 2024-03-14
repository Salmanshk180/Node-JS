"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const { Server } = require("socket.io");
const express_1 = __importDefault(require("express"));
const path = require("path");
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new Server(server);
app.use(express_1.default.static(path.resolve("./public")));
app.get("/", (req, res) => {
    return res.sendFile("index.html");
});
io.on("connection", (socket) => {
    socket.on("message", (message) => {
        io.emit("reply message", message);
    });
});
server.listen(9000, () => console.log("Server is listening on port 9000"));
