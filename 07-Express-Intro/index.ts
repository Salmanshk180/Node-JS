import express, { Request, Response } from "express";
const app = express();
app.get("/", (req: Request, res: Response) => {
  res.send("Home Page");
});

app.get("/about", (req: Request, res: Response) => {
  res.send("About Page");
});

app.listen(8000, () => console.log("Server listening on port:8000"));
