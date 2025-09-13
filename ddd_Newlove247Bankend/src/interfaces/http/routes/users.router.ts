import express from 'express';
import athu from './presentation/controllers/auth.controller';
const userRouter = express.Router();
userRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to Newlove247 Backend API' });
});
 userRouter.use('/auth' , athu )
export default userRouter;