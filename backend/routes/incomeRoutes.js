import { Router } from "express";
import {
  addIncome,
  getIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";
const incomeRoutes = Router();

incomeRoutes.post("/add", protect, addIncome);
incomeRoutes.get("/get", protect, getIncome);
incomeRoutes.delete("/:id", protect, deleteIncome);
incomeRoutes.get("/downloadexcel", protect, downloadIncomeExcel);

export { incomeRoutes };
