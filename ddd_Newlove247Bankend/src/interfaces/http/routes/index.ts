import express from 'express';
const route = express.Router();
import userRoutes from './users.router';
import { ipConsoleMiddleware } from '../middlewares/ipconsoleindex.Middleware';

// Sử dụng middleware để log IP cho tất cả routes
route.use(ipConsoleMiddleware);
route.use('/users', userRoutes);

export default route;
