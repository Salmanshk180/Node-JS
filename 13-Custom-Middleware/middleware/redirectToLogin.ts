// service/redirectToLogin.ts

import express from "express";
import { getUser } from "../service/auth";
import { Roles } from "../utils/Roles";
interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}
interface AuthenticatedRequest extends express.Request {
  user?: User;
}

export async function redirectToLogin(
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) {
  const userToken = req.cookies?.token;

  if (!userToken) {
    return res.redirect("/api/login");
  }
  const user = getUser(userToken);

  if (!user) {
    return res.redirect("/api/login");
  }
  req.user = user;
  if (req.originalUrl.startsWith("/api/admin") && user.role !== Roles.Admin) {
    return res.status(Number(process.env.UNAUTHORIZED_ACCESS)).send("Unauthorized");
  }
  next();
}
