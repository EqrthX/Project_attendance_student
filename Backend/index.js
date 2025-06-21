import express from "express";
import {sequelize} from "./models/attendace.model.js";
import userRouter from "./routes/user.routes.js";

const app = express()

app.use(express.json());

// router API
app.use("/users", userRouter);

sequelize.sync({force: false})
    .then(() => {
    app.listen(3001, () => console.log(`Server on http://localhost:3001`))
    })
    .catch((err) => {
        console.error("Sequelize sync failed:", err)
    })
