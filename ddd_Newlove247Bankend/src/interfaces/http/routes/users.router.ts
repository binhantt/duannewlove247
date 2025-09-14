import express from 'express';
import {buildGroupedRoutes }from '../../../shared/utils/routeBuilder';
import { AuthController } from '../controllers/Athu.controllers';
import {db} from "../../../infrastructure/config/database.config"; // file kết nối knex
import UserRepositoryMysql from '../../../infrastructure/database/repositories/UserRepositoryMysql';
const userRouter = express.Router();
// huong doi tuong 
const userRepository = new UserRepositoryMysql(db);
const authController = new AuthController(userRepository);
userRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to Newlove247 Backend API' });
});

// phuong thuc get auuth
 buildGroupedRoutes(userRouter, [
  {
    basePath: '/auth',
    routes: [
    {   method: 'post',path: '/register',handler :(req,res)=> authController.googleAuth(req, res)  },
    // {   method: 'post',path: '/login',handler : authController.login},
    ],
  },
]);

export default userRouter;