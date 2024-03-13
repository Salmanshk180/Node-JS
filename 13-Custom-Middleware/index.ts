import express from "express";
import { auth } from "./routes/auth";
import { users } from "./routes/users";
import { login } from "./routes/login";

const app = express();
app.use(express.json());

app.use("/api", users);
app.use("/api", auth);
app.use("/api", login);

app.listen(8000, () => console.log("Server is listening on port 8000"));
