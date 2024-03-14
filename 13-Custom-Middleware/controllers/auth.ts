import express from "express";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");
const data = require("../users.json");
interface User {
  id: string;
  email: string;
  password: string;
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
    console.log("No email provided"); // Debugging statement
    return res.status(404).json({ error: "Please enter an email" });
  }
  if (!password) {
    console.log("No password provided"); // Debugging statement
    return res.status(404).json({ error: "Please enter a password" });
  }
  if (!emailRegex.test(email)) {
    console.log("Invalid email format"); // Debugging statement
    return res.status(401).json({ error: "Please enter a valid email" });
  }
  if (!passwordRegex.test(password)) {
    console.log("Invalid password format"); // Debugging statement
    return res.status(401).json({
      error:
        "Password should contain at least one lowercase alphabet, one uppercase alphabet, one numeric value, and one special character, and total length must be in the range [8-15]",
    });
  }
  const id = uuidv4();
  const userExist = await data.find((user: User) => user.email === email);
  if (userExist) {
    console.log("User already exists"); // Debugging statement
    return res.status(401).json({ error: "User Already Exist" });
  }
  data.push({ id: id, email, password });
  fs.writeFile(
    "./users.json",
    JSON.stringify(data),
    (error: NodeJS.ErrnoException, data: Buffer) => {
      if (error) {
        console.error("Error writing to file:", error); // Debugging statement
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("User created successfully"); // Debugging statement
        return res.status(201).json({ Status: "User Created" });
      }
    }
  );
  console.log("Redirecting to login page"); // Debugging statement
  res.redirect("/api/login");
}
