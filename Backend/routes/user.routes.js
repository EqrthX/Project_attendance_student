import express from "express";
import { createUsers, deleteUser, getUsers, updateUser } from "../controllers/users.controllers.js";

const userRouter = express.Router();

userRouter.post('/create-user', createUsers);
userRouter.get('/users', getUsers);
userRouter.put('/update-user/:id', updateUser);
userRouter.delete('/delete-user/:id', deleteUser);

export default userRouter;