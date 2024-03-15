import express from "express";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth";
const data = require("../users.json");
var jwt = require("jsonwebtoken");
interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

export async function handleLogin(req: express.Request, res: express.Response) {
  const { email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  if (!email) {
    return res.status(Number(process.env.NO_DATA_FOUND)).json({ error: "Please enter a email" });
  }
  if (!password) {
    return res.status(Number(process.env.NO_DATA_FOUND)).json({ error: "Please enter a password" });
  }
  if (!emailRegex.test(email)) {
    return res.status(Number(process.env.INVALID_INPUT)).json({ error: "Please enter a valid email" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(Number(process.env.INVALID_INPUT)).json({
      error:
        "Password should contain at least one lowercase alphabet,one uppercase alphabet,one numeric value,and total length must be in the range [8-15]",
    });
  }
  const user: User = await data.find((user: User) => user.email === email);
  if (!user) {
    return res.status(Number(process.env.NO_DATA_FOUND)).json({ error: "User Not Found" });
  }
  const passwordValidate = user.password === password;
  if (!passwordValidate) {
    return res.status(Number(process.env.INVALID_INPUT)).json({ error: "Please check your password" });
  }
  const token = setUser(user);
  res.cookie("token", token);
 return res.redirect("/api/url");
}
