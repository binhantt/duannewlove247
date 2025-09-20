import { Request, Response, NextFunction } from "express";
import passportGoogle from "../../../infrastructure/auth/passportGoole";
import passportFacebook from "../../../infrastructure/auth/passportFacebook";
import UserRepositoryMysql from "../../../infrastructure/database/repositories/UserRepositoryMysql";
import { User } from "../../../domain/entities/Users";
import bcrypt from "bcrypt";
import { db } from "../../../infrastructure/config/database.config";
import { jwtDecode } from "jwt-decode";

export class AuthController {
  /**
   * Google Auth
   */

  static async GoogleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      // 1. Nếu FE gửi credential từ Google
      const { credentialResponse } = req.body;
      if (!credentialResponse?.credential) {
        return res.status(400).json({ message: "Missing Google credential" });
      }
  
      // 2. Decode JWT từ Google
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log("👉 decoded:", decoded);
      // 3. Tạo user object
      const newUser: User = {
        email: decoded.email,
        password: null, 
        name: decoded.name,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: decoded.picture,
        phone: null,
        address: null,
        gender: null,
        dateOfBirth: null,
        status: "active",
        isActive: true,
      };
      console.log("👉 newUser:", newUser);
      // 4. Nếu muốn set password local (optional)
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(req.body.password, salt);
      }
  
      const userRepository = new UserRepositoryMysql(db);
  
      // 5. Kiểm tra user đã tồn tại chưa
      let user = await userRepository.findByEmail(newUser.email);
  
      if (!user) {
        // 6. Nếu chưa có thì tạo user mới
        user = await userRepository.createGoogleUser(newUser);
      }
  
      // 7. Trả về user
      return res.json({
        message: "Google login success",
        user,
      });
    } catch (error) {
      next(error);
    }
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
  
    return passportFacebook.authenticate(
      "facebook",
      { failureRedirect: "/login" },
      (err, user) => {
        if (err) {
          console.error("❌ Lỗi Facebook Passport:", err);
          return next(err);
        }
        if (!user) {
          return res.redirect(process.env.CLIENT_URL + "");
        }
  
        req.logIn(user, (err) => {
          if (err) {
            console.error("❌ Lỗi khi req.logIn:", err);
            return next(err);
          }
  
          console.log("✅ Đăng nhập Facebook thành công!");
          console.log("👉 User hiện tại:", user);
          return res.redirect(process.env.CLIENT_URL + "/");
        });
      }
    )(req, res, next);
    
  }

 
}
