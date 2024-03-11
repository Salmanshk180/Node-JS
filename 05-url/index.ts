import * as http from "http"; 
const fs = require("fs");
const url = require("url");
const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    const log = `${Date.now()} new request\n`;
    const myUrl = url.parse(req.url,true);
    fs.appendFile("log.txt", log, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    console.log(myUrl.query);
    res.end();
  }
);

server.listen(8000, () => console.log("server listening on port 8000"));
