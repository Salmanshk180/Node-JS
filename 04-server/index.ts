const http = require("http");
const fs = require("fs");

const server = http.createServer(
  (req:Request, res:Response) => {
    const log = `${Date.now()} new request\n`;
    fs.appendFile(
      "log.txt",
      log,
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.log(err);
          return;
        }
      }
    );
    console.log(req);
    console.log(res);
  }
);

server.listen(8000, () => console.log("server listening on port 8000"));
