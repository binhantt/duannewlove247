import express from "express";
import session from "express-session";
import passport from "../../../../infrastructure/framework/passport";

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
