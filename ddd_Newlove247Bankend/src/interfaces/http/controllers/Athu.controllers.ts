// src/interfaces/http/controllers/Auth.controllers.ts
import { Request, Response, NextFunction } from "express";
import passport from "../../../infrastructure/framework/passport";
import  UserRepositoryMysql from "../../../infrastructure/database/repositories/UserRepositoryMysql"
import { verifyGoogleToken } from "../../../shared/utils/GoogleVerify";
import { User } from "../../../domain/entities/Users";
export class AuthController {
  static GetGoogleAuth(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  }

 static GoogleCallback(req: Request, res: Response, next: NextFunction) {
  return passport.authenticate("google", { failureRedirect: "/login" }, async (err, profile) => {
    if (err) return next(err);

    const newUser: User = {
      google_id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0].value,
      avatarUrl: profile.photos?.[0].value,
      role: "user"
    };

    const userRepository = new UserRepositoryMysql();
    const createdUser = await userRepository.createGoogleUser(newUser);

    req.logIn(createdUser, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login success", user: createdUser });
    });
  })(req, res, next);
}

}
