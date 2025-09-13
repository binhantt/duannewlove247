import express from "express";
import passport from "../../../../../infrastructure/framework/passport"; // đường dẫn tới file passport.ts

const authRouter = express.Router();

// redirect tới Google login
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback từ Google
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("Logged in user:", req.user);
   res.json({
      success: true,
      message: "Login thành công",
      user: req.user, // có thể trả info user nếu muốn
    });
  }
);

export default authRouter;
