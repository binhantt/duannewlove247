import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../config/database.config"; // Knex instance
import { User } from "../../domain/entities/Users";
import dotenv from "dotenv";
dotenv.config();
const passportGoole = passport 

passportGoole.use(
     new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "",
    },
    
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await db<User>("users").where({ google_id: profile.id }).first();
        console.log(user)
        if (!user) {
        

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
        }
        console.log(user)
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
)

export default passportGoole ;
