import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../config/database.config"; // Knex instance
import { User } from "../../domain/entities/Users";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.GOOGLE_CALLBACK_URL)
passport.use(
     new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        // Kiểm tra user đã tồn tại chưa

        let user = await db<User>("users").where({ google_id: profile.id }).first();
        if (!user) {
          // Nếu chưa có thì tạo mới
          const [newUser] = await db<User>("users")
            .insert({
              name: profile.displayName,
              email: profile.emails?.[0].value,
              google_id: profile.id,
              provider: "google",
              is_verified: true,
            })
            .returning("*");
          
          user = newUser;
           console.log(user)
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// serialize & deserialize
passport.serializeUser((user: any, done) => {
  try {
    // Chỉ lưu id của user vào session
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await db<User>("users").where({ id }).first();

    if (!user) return done(null, null);

    // Chuyển sang plain object JSON để tránh lỗi serialize
    const plainUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      google_id: user.google_id,
      provider: user.provider,
      is_verified: user.is_verified
    };

    done(null, plainUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
