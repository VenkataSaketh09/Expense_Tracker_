import { Income } from "../models/Income.js";
import xlsx from "xlsx";
//Add income
const addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "Provide the required fields" });
    }
    const income = await Income.create({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    return res.status(201).json({ income });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
//get income
const getIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json({ income });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
//delete income
const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
//download excel sheet
const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    //prepare data for excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
export { addIncome, getIncome, deleteIncome, downloadIncomeExcel };
