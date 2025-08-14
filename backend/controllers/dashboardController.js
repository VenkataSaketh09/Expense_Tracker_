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
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ];

    const totalIncome = await Income.aggregate(pipeline);
    console.log("Total Income", { totalIncome, userId: isValidObjectId(userId) });

    const totalExpense = await Expense.aggregate(pipeline);
    console.log("Total Expense", { totalExpense, userId: isValidObjectId(userId) });
  
  //get income transactions in the last 60 days
  const last60DaysIncomeTransactions=await Income.find({
    userId,
    date:{$gte:new Date(Date.now()-60*24*60*60*1000)}
  }).sort({date:-1})

  //get total income for last 60 days
  const last60DaysIncome=last60DaysIncomeTransactions.reduce((sum,transaction)=>sum+transaction.amount,0)

  //get expense transactions in the last30 days
  const last30DaysExpenseTransactions=await Expense.find({
    userId,
    date:{$gte:new Date(Date.now()-30*24*60*60*1000)}
  }).sort({date:-1})

    //get total income for last 30 days
  const last30DaysExpense=last30DaysExpenseTransactions.reduce((sum,transaction)=>sum+transaction.amount,0)
  //fetch last 5 transactions(income+expense)
  // fetch last 5 transactions from income
const last5Income = (await Income.find({ userId })
  .sort({ date: -1 })
  .limit(5))
  .map(transaction => ({
    ...transaction.toObject(),
    type: "income",
  }));

// fetch last 5 transactions from expense
const last5Expense = (await Expense.find({ userId })
  .sort({ date: -1 })
  .limit(5))
  .map(transaction => ({
    ...transaction.toObject(),
    type: "expense",
  }));

// merge and sort by date in JavaScript
const last5Transactions = [...last5Income, ...last5Expense]
  .sort((a, b) => b.date - a.date);

  res.json({
    totalBalance:
    (totalIncome[0]?.total || 0)-(totalExpense[0]?.total || 0),
    ttalIncome:totalIncome[0]?.total || 0,
    totalExpense:totalExpense[0]?.total || 0,
    last30daysExpenses:{
        total:last30DaysExpense,
        transaction:last30DaysExpenseTransactions
    },
    last60daysIncome:{
        total:last60DaysIncome,
        transaction:last60DaysIncomeTransactions
    },
    receentTransactions:last5Transactions,
  })
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error: " + err.message });
  }

};

export {getDashboardData}