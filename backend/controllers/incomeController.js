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

    //prepare data for excel with better formatting
    const data = income.map((item, index) => ({
      "S.No": index + 1,
      "Income Source": item.source || "N/A",
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
      "Income Source": "TOTAL",
      "Amount (₹)": totalAmount,
      Date: "",
      Created: "",
    });

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    // Set column widths
    const colWidths = [
      { wch: 8 }, // S.No
      { wch: 20 }, // Income Source
      { wch: 15 }, // Amount
      { wch: 15 }, // Date
      { wch: 8 }, // Icon
      { wch: 15 }, // Created
    ];
    ws["!cols"] = colWidths;

    // Add some styling to the header row
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "8B5CF6" } },
      alignment: { horizontal: "center" },
    };

    // Apply header styling (first row)
    const range = xlsx.utils.decode_range(ws["!ref"]);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = xlsx.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = headerStyle;
    }

    xlsx.utils.book_append_sheet(wb, ws, "Income Report");

    const filename = `income_report_${
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
export { addIncome, getIncome, deleteIncome, downloadIncomeExcel };
