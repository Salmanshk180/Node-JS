import express from "express";
import { handleAuthentication } from "../controllers/auth";
import { handleLogin } from "../controllers/login";
import { handleGetUsers } from "../controllers/users";
// import { addURL } from "../controllers/url";

export const router = express.Router();

router.post("/users", handleAuthentication);
router.post("/login", handleLogin);
// router.post("/url", addURL);
// router.get("/", handleGetUsers);
