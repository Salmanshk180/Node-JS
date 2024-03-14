// app.ts

import express from "express";
import { redirectToLogin } from "./service/redirectToLogin";
import { router } from "./routes/routes";
import { staticroute } from "./routes/staticRoute";
import { urlRouter } from "./routes/urlRoute";
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/url", redirectToLogin, urlRouter);
app.use("/api/admin/users", redirectToLogin, staticroute);
app.use("/api", router);
app.use("/api", staticroute);

app.listen(8000, () => console.log("Server is listening on port 8000"));
