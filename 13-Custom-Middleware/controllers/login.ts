import express from "express";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth";
import { ERROR_MESSAGE, HTTP_STATUS_CODES } from "../constants/constant";
const data = require("../users.json");
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
    return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .json(ERROR_MESSAGE._NotFound("Email"));
  }
  if (!password) {
    return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .json(ERROR_MESSAGE._NotFound("Passowrd"));
  }
  if (!emailRegex.test(email)) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json(ERROR_MESSAGE._Bad_Request);
  }
  if (!passwordRegex.test(password)) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json(ERROR_MESSAGE._Bad_Request);
  }
  const user: User = await data.find((user: User) => user.email === email);
  if (!user) {
    return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .json(ERROR_MESSAGE._NotFound("User"));
  }
  const passwordValidate = user.password === password;
  if (!passwordValidate) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json(ERROR_MESSAGE._NotMatch("Password"));
  }
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/api/url");
}
