import express from "express";
import { redirectToLogin } from "../middleware/redirectToLogin";

export const staticroute = express();
const urls = require("../urls.json");
const users = require("../users.json");
interface User {
  id: string;
  email: string;
  password: string;
}
interface URL {
  originalURL: string;
  shortURL: string;
  createdBy: string;
}
interface AuthenticatedRequest extends express.Request {
  user?: User;
}

staticroute.get(
  "/url",
  async (req: AuthenticatedRequest, res: express.Response) => {
    if (!req.user) return res.redirect("/login");
    const filterData = urls.filter(
      (url: URL) => url.createdBy === req.user?.id
    );
    return res.render("home", {
      urls: filterData,
      newUrl: filterData[filterData.length - 1].shortURL,
      originalURL: filterData[filterData.length - 1].originalURL,
    });
  }
);
staticroute.get("/login", (req, res) => {
  return res.render("Login");
});
staticroute.get("/signup", (req, res) => {
  return res.render("SignUp");
});

staticroute.get("/admin/users", (req, res) => {
  return res.render("dashboard", { users: users });
});
