import express from 'express';
import {buildGroupedRoutes }from '../../../shared/utils/routeBuilder';
import { AuthController } from '../controllers/Athu.controllers';
import {db} from "../../../infrastructure/config/database.config"; // file kết nối knex
import UserRepositoryMysql from '../../../infrastructure/database/repositories/UserRepositoryMysql';
const userRouter = express.Router();
// phuong thuc get auuth
 buildGroupedRoutes(userRouter, [
  {
    basePath: '/auth',
    routes: [
    {   method: 'get',path: '/google',handler :AuthController.GetGoogleAuth},
    {   method: 'get',path: '/google/callback',handler : AuthController.GoogleCallback},
    ],
  },
]);

export default userRouter;