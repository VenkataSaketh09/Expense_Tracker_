import { Router } from "express";
import {
  addExpense,
  getExpense,
  deleteExpense,
  downloadExpenseExcel,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";
const expenseRoutes = Router();
expenseRoutes.post("/add", protect, addExpense);
expenseRoutes.get("/get", protect, getExpense);
expenseRoutes.delete("/:id", protect, deleteExpense);
expenseRoutes.get("/downloadexcel", protect, downloadExpenseExcel);
export { expenseRoutes };
