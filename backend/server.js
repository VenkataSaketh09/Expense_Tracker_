import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./configs/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { incomeRoutes } from "./routes/incomeRoutes.js";
import { expenseRoutes } from "./routes/expenseRoutes.js";
import { dashboardRouter } from "./routes/dashboardRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Listening on Port ${PORT}`);
});
