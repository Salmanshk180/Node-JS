const http = require("http");
const fs = require("fs");

const server = http.createServer(
  (req: NodeJS.ErrnoException, res: NodeJS.ErrnoException) => {
    const log = `${Date.now()} new request\n`;
    fs.appendFile(
      "log.txt",
      log,
      (err: NodeJS.ErrnoException, result: Buffer) => {
        if (err) {
          console.log(err);
          return;
        }
      }
    );
  }
);

server.listen(8000, () => console.log("server listening on port 8000"));
