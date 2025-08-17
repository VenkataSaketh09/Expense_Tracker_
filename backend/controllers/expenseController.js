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

    //prepare data for excel with better formatting
    const data = expense.map((item, index) => ({
      "S.No": index + 1,
      "Expense Category": item.category || "N/A",
      "Amount (₹)": parseFloat(item.amount) || 0,
      Date: item.date
        ? new Date(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : "N/A",
      Created: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-US")
        : "N/A",
    }));

    // Calculate totals
    const totalAmount = data.reduce(
      (sum, item) => sum + (item["Amount (₹)"] || 0),
      0
    );

    // Add summary row
    data.push({
      "S.No": "",
      "Expense Category": "TOTAL",
      "Amount (₹)": totalAmount,
      Date: "",
      Created: "",
    });

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    // Set column widths
    const colWidths = [
      { wch: 8 }, // S.No
      { wch: 20 }, // Expense Category
      { wch: 15 }, // Amount
      { wch: 15 }, // Date
      { wch: 8 }, // Icon
      { wch: 15 }, // Created
    ];
    ws["!cols"] = colWidths;

    // Add some styling to the header row
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "EF4444" } }, // Red color for expenses
      alignment: { horizontal: "center" },
    };

    // Apply header styling (first row)
    const range = xlsx.utils.decode_range(ws["!ref"]);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = xlsx.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = headerStyle;
    }

    xlsx.utils.book_append_sheet(wb, ws, "Expense Report");

    const filename = `expense_report_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    xlsx.writeFile(wb, filename);
    res.download(filename);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
export { addExpense, getExpense, deleteExpense, downloadExpenseExcel };
