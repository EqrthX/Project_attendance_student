import express from "express";
import {sequelize} from "./models/attendace.model.js";
import userRouter from "./routes/user.routes.js";
import loginRouter from "./routes/login.route.js";
import cors from "cors"
import { verifyToken } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
const app = express()

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
// router API
app.use("/", loginRouter)
app.use("/users", verifyToken ,userRouter);

sequelize.sync({force: true})
    .then(() => {
    app.listen(3001, () => console.log(`Server on http://localhost:3001`))
    })
    .catch((err) => {
        console.error("Sequelize sync failed:", err)
    })
