import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./configs/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { incomeRoutes } from "./routes/incomeRoutes.js";
import { expenseRoutes } from "./routes/expenseRoutes.js";
import { dashboardRouter } from "./routes/dashboardRoutes.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    // 'https://expense-tracker-eight-rho-17.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};

app.use(cors(corsOptions));
// app.use(cors());
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
