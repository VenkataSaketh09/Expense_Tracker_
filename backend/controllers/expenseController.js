import { Expense } from "../models/Expense.js";
import xlsx from "xlsx";
//Add expense
const addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "Provide the required fields" });
    }
    const expense = await Expense.create({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    return res.status(201).json({ expense });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
//get Expense
const getExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json({ expense });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
//delete Expense
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
//download excel sheet
const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    //prepare data for excel
    const data = expense.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
export { addExpense, getExpense, deleteExpense, downloadExpenseExcel };
