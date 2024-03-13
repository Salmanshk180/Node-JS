import express from "express";

export const login = express.Router();
const data = require("../users.json");

interface User {
  id: string;
  email: string;
  password: string;
}

login.post("/login", (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  if (!email) {
    return res.status(404).json({ error: "Please enter a email" });
  }
  if (!password) {
    return res.status(404).json({ error: "Please enter a password" });
  }
  if (!emailRegex.test(email)) {
    return res.status(401).json({ error: "Please enter a valid email" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(401).json({
      error:
        "Password should contain at least one lowercase alphabet,one uppercase alphabet,one numeric value,and total length must be in the range [8-15]",
    });
  }
  const user: User = data.find((user: User) => user.email === email);
  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }

  const passwordValidate = user.password === password;
  if (!passwordValidate) {
    return res.status(401).json({ error: "Please check your password" });
  }
  return res.status(200).json({ Status: "Login Successfull" });
});
