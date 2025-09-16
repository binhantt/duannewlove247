import { Request, Response, NextFunction } from "express";
import passportGoogle from "../../../infrastructure/auth/passportGoole";
import passportFacebook from "../../../infrastructure/auth/passportFacebook";
import UserRepositoryMysql from "../../../infrastructure/database/repositories/UserRepositoryMysql";
import { User } from "../../../domain/entities/Users";

import { db } from "../../../infrastructure/config/database.config";

export class AuthController {
  /**
   * Google Auth
   */
  static GetGoogleAuth(req: Request, res: Response, next: NextFunction) { 
    console.log("🚀 [GoogleAuth] Bắt đầu Google Auth request...");
    return passportGoogle.authenticate("google", {
      session: true,

      scope: ["profile", "email"],
    })(req, res, next);
  }

  static GoogleCallback(req: Request, res: Response, next: NextFunction) {
    console.log("🚀 [GoogleCallback] Nhận callback từ Google");
    console.log("👉 req.query:", req.query);
    
    return passportGoogle.authenticate(
      "google",
    
      
      { failureRedirect: "/login" },
      async (err, profile) => {
        console.log("👉 Passport Google trả về:", { err, profile });

        try {
          if (err) {
            console.error("❌ Lỗi Google Passport:", err);
            return next(err);
          }
          if (!profile) {
            console.error("❌ Không tìm thấy profile từ Google");
            return next(new Error("Profile not found"));
          }
          const user = await db<User>("users").where({ google_id: profile.id }).first();
          if (user) {
            req.logIn(user, (err) => {
              if (err) return next(err);
              return res.json({ message: "Login success", user: user });
            });
          }
          const newUser: User = {
            google_id: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatarUrl: profile.photos?.[0]?.value,
            role: "user",
          };
          console.log("👉 User mapping từ Google:", newUser);

          const userRepository = new UserRepositoryMysql();
          const createdUser = await userRepository.createGoogleUser(newUser);
          console.log("✅ User đã lưu vào MySQL:", createdUser);

          req.logIn(createdUser, (err) => {
            if (err) {
              console.error("❌ Lỗi khi req.logIn:", err);
              return next(err);
            }
            console.log("✅ Đăng nhập Google thành công!");
            console.log("👉 User hiện tại:", createdUser);
            return res.json({ message: "Google login success", user: createdUser });
          });
        } catch (error) {
          console.error("❌ Exception Google:", error);
          next(error);
        }
      }
    )(req, res, next);
  }

  /**
   * Facebook Auth
   */
  static GetFacebookAuth(req: Request, res: Response, next: NextFunction) {
    console.log("🚀 [FacebookAuth] Bắt đầu Facebook Auth request...");
    console.log("👉 req.query:", req.query);
    console.log("👉 req.body:", req.body);
    return passportFacebook.authenticate("facebook", {
      scope: ["email", "public_profile"],
    })(req, res, next);
  }

  static FacebookCallback(req: Request, res: Response, next: NextFunction) {
    console.log("🚀 [FacebookCallback] Nhận callback từ Facebook");
    console.log("👉 req.query:", req.query);

    return passportFacebook.authenticate(
      "facebook",
      { failureRedirect: "/login" },
      async (err, profile) => {
        console.log("👉 Passport Facebook trả về:", { err, profile });

        try {
          if (err) {
            console.error("❌ Lỗi Facebook Passport:", err);
            return next(err);
          }
          if (!profile) {
            console.error("❌ Không tìm thấy profile từ Facebook");
            return next(new Error("Profile not found"));
          }

          const newUser: User = {
            facebook_id: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar_url: profile.photos?.[0]?.value,
            role: "user",
          };
          console.log("👉 User mapping từ Facebook:", newUser);

          const userRepository = new UserRepositoryMysql();
          const createdUser = await userRepository.createFacebookUser(newUser);
          console.log("✅ User đã lưu vào MySQL:", createdUser);

          req.logIn(createdUser, (err) => {
            if (err) {
              console.error("❌ Lỗi khi req.logIn:", err);
              return next(err);
            }
            console.log("✅ Đăng nhập Facebook thành công!");
            console.log("👉 User hiện tại:", createdUser);
            return res.redirect("http://localhost:3000/dashboard");
          });
        } catch (error) {
          console.error("❌ Exception Facebook:", error);
          next(error);
        }
      }
    )(req, res, next);
  }
}
