import { Income } from "../models/Income.js";
import { Expense } from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // fetch total income and expenses
    const pipeline = [
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ];

    const totalIncome = await Income.aggregate(pipeline);
    console.log("Total Income", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate(pipeline);
    console.log("Total Expense", {
      totalExpense,
      userId: isValidObjectId(userId),
    });

    //get income transactions in the last 60 days
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    console.log("60 days ago date:", sixtyDaysAgo);

    let last60DaysIncomeTransactions = (
      await Income.find({
        userId,
        date: { $gte: sixtyDaysAgo },
      }).sort({ date: -1 })
    ).map((transaction) => ({
      ...transaction.toObject(),
      type: "income",
    }));

    console.log(
      "Last 60 days income transactions found:",
      last60DaysIncomeTransactions.length
    );
    console.log(
      "Sample income dates:",
      last60DaysIncomeTransactions.slice(0, 3).map((t) => t.date)
    );

    // If no transactions in last 60 days, get the most recent 10 income transactions
    if (last60DaysIncomeTransactions.length === 0) {
      console.log("No income in last 60 days, getting recent income instead");
      last60DaysIncomeTransactions = (
        await Income.find({ userId }).sort({ date: -1 }).limit(10)
      ).map((transaction) => ({
        ...transaction.toObject(),
        type: "income",
      }));
    }

    //get total income for last 60 days
    const last60DaysIncome = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //get expense transactions in the last30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    console.log("30 days ago date:", thirtyDaysAgo);

    let last30DaysExpenseTransactions = (
      await Expense.find({
        userId,
        date: { $gte: thirtyDaysAgo },
      }).sort({ date: -1 })
    ).map((transaction) => ({
      ...transaction.toObject(),
      type: "expense",
    }));

    console.log(
      "Last 30 days expense transactions found:",
      last30DaysExpenseTransactions.length
    );
    console.log(
      "Sample expense dates:",
      last30DaysExpenseTransactions.slice(0, 3).map((t) => t.date)
    );

    // If no transactions in last 30 days, get the most recent 10 expense transactions
    if (last30DaysExpenseTransactions.length === 0) {
      console.log(
        "No expenses in last 30 days, getting recent expenses instead"
      );
      last30DaysExpenseTransactions = (
        await Expense.find({ userId }).sort({ date: -1 }).limit(10)
      ).map((transaction) => ({
        ...transaction.toObject(),
        type: "expense",
      }));
    }

    //get total income for last 30 days
    const last30DaysExpense = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    //fetch last 5 transactions(income+expense)
    // fetch last 5 transactions from income
    const last5Income = (
      await Income.find({ userId }).sort({ date: -1 }).limit(5)
    ).map((transaction) => ({
      ...transaction.toObject(),
      type: "income",
    }));

    // fetch last 5 transactions from expense
    const last5Expense = (
      await Expense.find({ userId }).sort({ date: -1 }).limit(5)
    ).map((transaction) => ({
      ...transaction.toObject(),
      type: "expense",
    }));

    console.log(
      "All expense transactions (last 5):",
      last5Expense.map((t) => ({
        date: t.date,
        amount: t.amount,
        category: t.category,
      }))
    );

    // merge and sort by date in JavaScript
    const last5Transactions = [...last5Income, ...last5Expense].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30daysExpenses: {
        total: last30DaysExpense,
        transactions: last30DaysExpenseTransactions,
      },
      last60daysIncome: {
        total: last60DaysIncome,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: last5Transactions,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error: " + err.message });
  }
};

export { getDashboardData };
