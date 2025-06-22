import express from "express";
import { deleteUser, getUsers, updateUser } from "../controllers/users.controllers.js";

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.put('/update-user/:id', updateUser);
userRouter.delete('/delete-user/:id', deleteUser);

export default userRouter;