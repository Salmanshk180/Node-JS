import express from "express";
import { redirectToLogin } from "../service/redirectToLogin";

export const staticroute = express();
const urls = require("../urls.json");
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
    //   const token = req.cookies.token;
    if (!req.user) return res.redirect("/login");
    const filterData = urls.filter((url: URL) => url.createdBy === req.user?.id);
    return res.render("home", {
      urls: filterData,
      newURL:
        filterData.length === 0
          ? "NO DATA"
          : filterData[filterData.length - 1].shortURL,
      originalURL:
        filterData.length === 0
          ? null
          : filterData[filterData.length - 1].originalURL,
    });
  }
);
staticroute.get("/login", (req, res) => {
  return res.render("Login");
});
staticroute.get("/users", (req, res) => {
  return res.render("SignUp");
});
