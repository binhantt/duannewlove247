import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { db } from "../config/database.config"; // Knex instance
import { User } from "../../domain/entities/Users";
import dotenv from "dotenv";

dotenv.config();
const passportFacebook = passport 
passportFacebook.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID || "",
      clientSecret: process.env.FB_CLIENT_SECRET || "",
      callbackURL: process.env.FB_CALLBACK_URL || "",
      profileFields: ["id", "displayName", "emails", "photos"], // lấy email nếu có
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
         console.log("👉 Google Strategy profile:", profile);
        // Kiểm tra user đã tồn tại chưa
        let user = await db<User>("users").where({ facebook_id: profile.id }).first();

        if (!user) {
          // Nếu chưa có thì tạo mới
          const [newUser] = await db<User>("users")
            .insert({
              name: profile.displayName,
              email: profile.emails?.[0]?.value, // email có thể undefined
              facebook_id: profile.id,
              provider: "facebook",
              avatar_url: profile.photos?.[0]?.value,
              is_verified: true,
            })
            .returning("*");
          user = newUser;
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);



export default passportFacebook;
