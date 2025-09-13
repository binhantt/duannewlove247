import express from 'express';
import session from "express-session";
import passport from "../../infrastructure/framework/passport";
import routes from './routes';
const app = express();

app.use(express.json());
app.use(
  session({
    secret: "keyboard cat", // đổi thành secret riêng
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // secure: true nếu dùng https
  })
);
app.use(passport.session());
    
app.use(passport.initialize());
// Routes
app.use('/api', routes);

export default app;