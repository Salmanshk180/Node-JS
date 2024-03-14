const http = require("http");
const { Server } = require("socket.io");
import { Socket, SocketType } from "dgram";
import express from "express";
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  return res.sendFile("index.html");
});

io.on("connection", (socket: Socket) => {
  socket.on("message", (message: string) => {
    io.emit("reply message", message);  
  });
});
server.listen(9000, () => console.log("Server is listening on port 9000"));
