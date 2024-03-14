// service/redirectToLogin.ts

import express from "express";
import { getUser } from "./auth";
interface User {
    id: string;
    email: string;
    password: string;
  }
interface AuthenticatedRequest extends express.Request {
  user?: User;
}

export async function redirectToLogin(req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) {
    const userToken = req.cookies?.token;

    if (!userToken) {
        return res.redirect("/api/login");
    }
    const user = getUser(userToken);
    console.log(user);
    
    if (!user) {
        return res.redirect("/api/login");
    }
    req.user = user;
    next();
}
