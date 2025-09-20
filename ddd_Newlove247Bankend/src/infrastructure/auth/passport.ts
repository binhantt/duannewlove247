// src/infrastructure/auth/passport.ts
import passport from "passport";
import { db } from "../config/database.config";
import { User } from "../../domain/entities/Users";

export const setupPassport = () => {
  // Serialize: chỉ lưu id
  passport.serializeUser((user: any, done) => {
    if (!user || !user.id) {
      return done(new Error("User object missing id in serializeUser"), null);
    }
    done(null, user.id.toString()); // luôn stringify để tránh bug kiểu dữ liệu
  });

  // Deserialize: từ id lấy user trong DB
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await db<User>("users").where({ id: parseInt(id) }).first();
      if (!user) return done(null, null);

      const plainUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        is_verified: user.is_verified,
        ...(user.provider === "google" && { google_id: user.google_id }),
        ...(user.provider === "facebook" && {
          facebook_id: user.facebook_id,
          avatar_url: user.avatar_url,
        }),
      };

      done(null, plainUser);
    } catch (err) {
      done(err, null);
    }
  });
};
