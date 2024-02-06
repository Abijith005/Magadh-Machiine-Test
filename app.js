import express from "express";
import morgan from "morgan";
import "dotenv/config";
import adminRouter from "./routes/adminRoutes.js";
import authorRouter from "./routes/authorRoutes.js";
import userRouter from "./routes/retailUserRoutes.js";
import adminAuthRouter from "./routes/adminAuthRoutes.js";
import authorAuthRouter from "./routes/authorAuthRoutes.js";
import userAuthRouter from "./routes/retailUserAuthRoutes.js";
import adminAuth from "./middlewares/adminAuth.js";
import authorAuth from "./middlewares/authorAuth.js";
import userAuth from "./middlewares/retailUserAuth.js";
import sequelize from "./config/sequelize.js";

const app = express();
const port = process.env.PORT || 6000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
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

app.use("/api/auth/admin", adminAuthRouter);
app.use("/api/auth/author", authorAuthRouter);
app.use("/api/auth/retailUser", userAuthRouter);
app.use("/api/admin", adminAuth, adminRouter);
app.use("/api/author", authorAuth, authorRouter);
app.use("/api/retailUser", userAuth, userRouter);
