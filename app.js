import express from "express";
import morgan from "morgan";
import "dotenv/config";
import authorRouter from "./routes/authorRoutes.js";
import userRouter from "./routes/retailUserRoutes.js";
import userAuthRouter from "./routes/retailUserAuthRoutes.js"
import adminAuth from "./middlewares/adminAuth.js";
import userAuth from './middlewares/retailUserAuth.js'
import sequelize from "./config/sequelize.js";

const app = express();
const port = process.env.PORT || 6000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });
app.listen(port, () => {
  console.log("App runnig");
});

app.use("/api/admin", authorRouter);
app.use("/api/author", authorRouter);
app.use("/api/auth/retailUser",userAuthRouter)
app.use("/api/retailUser",userAuth, userRouter);
