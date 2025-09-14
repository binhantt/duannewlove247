// src/interfaces/http/controllers/Auth.controllers.ts
import { Request, Response, NextFunction } from "express";
import passport from "../../../infrastructure/framework/passport";

export class AuthController {
  static GetGoogleAuth(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  }

  static GoogleCallback(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate("google", { failureRedirect: "/login" }, (err, user) => {
      if (err) return next(err);
      if (!user) return res.redirect("/login");
      console.log(user);
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.json({ message: "Login success", user });
      });
    })(req, res, next);
  }
}
