import express from 'express';
import {buildGroupedRoutes }from '../../../shared/utils/routeBuilder';
import { AuthController } from '../controllers/Athu.controllers';

const userRouter = express.Router();
// phuong thuc get auuth
 buildGroupedRoutes(userRouter, [
  {
    basePath: '/auth',
    routes: [
    {   method: 'post',path: '/google/callback',handler : AuthController.GoogleCallback},
    {   method: 'get',path: '/facebook',handler : AuthController.GetFacebookAuth},
    {   method: 'get',path: '/facebook/callback',handler : AuthController.FacebookCallback},
    // {   method: 'get',path: '/Login',handler : AuthController.GetLogin},
    ],
  },
]);

export default userRouter;