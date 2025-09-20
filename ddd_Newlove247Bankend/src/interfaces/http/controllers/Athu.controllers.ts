import { Request, Response, NextFunction } from "express";

import passportFacebook from "../../../infrastructure/auth/passportFacebook";
import UserRepositoryMysql from "../../../infrastructure/database/repositories/UserRepositoryMysql";
import { User } from "../../../domain/entities/Users";
import bcrypt from "bcrypt";
import { db } from "../../../infrastructure/config/database.config";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import  dotenv from "dotenv";
dotenv.config();
export class AuthController {
  /**
   * Google Auth
   */
  static ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "default_access_secret";
  static REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";
  static ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m";  // mặc định 15 phút
  static REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";  // mặc định 7 ngày
  static async GoogleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { credentialResponse } = req.body;
      if (!credentialResponse?.credential) {
        return res.status(400).json({ message: "Missing Google credential" });
      }
  
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log("👉 decoded:", decoded);
  
      const newUser: User = {
        email: decoded.email,
      
        name: decoded.name,
        role: "user",
        created_at: new Date(),
        updated_at: new Date(),
        avatar_url: decoded.picture,
        location : "",
        gender: "male",
        age: 0,
        occupation: "",
        education: "",
        is_verified: false,
        violation_count: 0,
        chat_ban_until: undefined,
        is_chat_locked: false,
        is_active: true,
        role: "user",
        subscription_plan: "free",
        subscription_expires: undefined,
        email_verified: false,
        verification_token: undefined,
        verification_expires: undefined,
        access_token: undefined,
        refresh_token: undefined,
        last_login_at: new Date(),
        created_at: new Date(), 
        updated_at: new Date(),
        provider: "google",
      };
  
    
  
      const userRepository = new UserRepositoryMysql(db);
  
      // Kiểm tra user đã tồn tại
      let user = await userRepository.findByEmail(newUser.email);
  
      if (!user) {
        user = await userRepository.create(newUser);
      }
  
      // --- Tạo token ---
      const payload = { id: user.id, email: user.email, role: user.role };
      const accessToken = jwt.sign(payload, AuthController.ACCESS_SECRET, {
        expiresIn: AuthController.ACCESS_EXPIRES
      });
      
      const refreshToken = jwt.sign(payload, AuthController.REFRESH_SECRET, {
        expiresIn: AuthController.REFRESH_EXPIRES
      });
  
      // Lưu refresh token vào DB
      await userRepository.update({...user,last_login_at: new Date(), access_token: accessToken, refresh_token: refreshToken});
  
      return res.json({
        message: "Google login success",
        user,
        accessToken,
        refreshToken,
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

  static async FacebookCallback(req: Request, res: Response, next: NextFunction) {
    return passportFacebook.authenticate(
      "facebook",
      { failureRedirect: "/login" },
      async (err, user: User) => {
        try {
          if (err) return next(err);
          if (!user) return res.redirect(process.env.CLIENT_URL || "/");
  
          const userRepository = new UserRepositoryMysql(db);
  
          // --- Tạo JWT token ---
          const payload = { id: user.id, email: user.email, role: user.role };
          const accessToken = jwt.sign(payload, AuthController.ACCESS_SECRET, {
            expiresIn: AuthController.ACCESS_EXPIRES,
          });
          const refreshToken = jwt.sign(payload, AuthController.REFRESH_SECRET, {
            expiresIn: AuthController.REFRESH_EXPIRES,
          });
  
          // --- Lưu token vào DB ---
          await userRepository.update({ ...user, access_token: accessToken, refresh_token: refreshToken });
  
          // --- Đăng nhập và redirect client ---
          req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect(
              `${process.env.CLIENT_URL || ""}/?accessToken=${accessToken}&refreshToken=${refreshToken}`
            );
          });
        } catch (error) {
          next(error);
        }
      }
    )(req, res, next);
  }
  

 
}