import express from 'express';
import session from "express-session";
import passport from "passport"; 
import { setupPassport } from "../../infrastructure/auth/passport";
import helmet from "helmet";

import routes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3001", // địa chỉ frontend Next.js
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());
setupPassport();
// Routes
app.use('/api', routes);

export default app;