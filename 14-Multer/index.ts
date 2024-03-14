import express from "express";
const path = require("path");
import multer, { FileFilterCallback } from "multer";
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const storage = multer.diskStorage({
  destination: function (
    request: express.Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, "./uploads");
  },
  filename: function (req: any, file: any, cb: Function) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+file.originalname);
  },
});

const uploads = multer({ storage: storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api", (req, res) => {
  res.render("home");
});

app.post(
  "/upload",
  uploads.single("photo"),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.redirect("/api")
  }
);
app.listen(8000, () => console.log("Server is listening on port 8000"));
