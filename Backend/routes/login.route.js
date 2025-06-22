import express from "express"
import { createUsers, login, logout, protectedToken } from "../controllers/login.controller.js"

const loginRouter = express.Router()

loginRouter.post("/login", login)
loginRouter.post("/register", createUsers)
loginRouter.get("/protected", protectedToken)
loginRouter.post("/logout", logout)

export default loginRouter