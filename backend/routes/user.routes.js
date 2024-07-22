import { Router } from 'express';
import { 
  signin,
  signup,
  getAllUsers,
  updateUser,
  getUserById
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post("/register", signup);
userRouter.post("/login", signin);
userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUserById);
userRouter.patch("/:userId", updateUser);

export default userRouter;