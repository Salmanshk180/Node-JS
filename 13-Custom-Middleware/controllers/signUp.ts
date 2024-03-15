import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  ERROR_MESSAGE,
  HTTP_STATUS_CODES,
  SUCCESS_MESSAGES,
} from "../constants/constant";
const fs = require("fs");
const data = require("../users.json");
interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}
export async function handleAuthentication(
  req: express.Request,
  res: express.Response
) {
  console.log("Request Body:", req.body); // Debugging statement
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
      .json(ERROR_MESSAGE._NotFound("Password"));
  }
  if (!emailRegex.test(email)) {
    console.log("Invalid email format"); // Debugging statement
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json(ERROR_MESSAGE._Bad_Request);
  }
  if (!passwordRegex.test(password)) {
    console.log("Invalid password format"); // Debugging statement
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json(ERROR_MESSAGE._Bad_Request);
  }
  const id = uuidv4();
  const userExist = await data.find((user: User) => user.email === email);
  if (userExist) {
    return res
      .status(HTTP_STATUS_CODES.CONFLICT)
      .json(ERROR_MESSAGE._Conflict("User"));
  }
  data.push({ id: id, email, password, role: "Normal" });
  fs.writeFile(
    "./users.json",
    JSON.stringify(data),
    (error: NodeJS.ErrnoException, data: Buffer) => {
      if (error) {
        console.error("Error writing to file:", error); // Debugging statement
        return res
          .status(HTTP_STATUS_CODES.OK)
          .json(ERROR_MESSAGE._Internal_Server_Error);
      } else {
        console.log("User created successfully"); // Debugging statement
        return res.status(HTTP_STATUS_CODES.OK).json(SUCCESS_MESSAGES._Ok);
      }
    }
  );
  console.log("Redirecting to login page"); // Debugging statement
  res.redirect("/api/login");
}
