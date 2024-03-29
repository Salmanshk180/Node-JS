"use strict";
const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
    const log = `${Date.now()} new request\n`;
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    console.log(req);
    console.log(res);
});
server.listen(8000, () => console.log("server listening on port 8000"));
