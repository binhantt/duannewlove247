// src/infrastructure/auth/passport.ts
import passport from "passport";
import { db } from "../config/database.config";
import { User } from "../../domain/entities/Users";

export const setupPassport = () => {
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await db<User>("users").where({ id }).first();
      if (!user) return done(null, null);

      const plainUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        is_verified: user.is_verified,
        ...(user.provider === "google" && { google_id: user.google_id }),
        ...(user.provider === "facebook" && { facebook_id: user.facebook_id, avatar_url: user.avatarUrl }),
      };

      done(null, plainUser);
    } catch (err) {
      done(err, null);
    }
  });
};
