import React from "react";
import { LuArrowRight } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import moment from "moment";

const Last30DaysExpenses = ({ transactions, onSeeMore }) => {
  // Group transactions by date and sum amounts
  const groupedData = transactions?.reduce((acc, transaction) => {
    const date = moment(transaction.date).format("YYYY-MM-DD");
    if (acc[date]) {
      acc[date].amount += transaction.amount;
    } else {
      acc[date] = {
        date: transaction.date,
        amount: transaction.amount,
      };
    }
    return acc;
  }, {});

  const chartData = Object.values(groupedData || {}).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h5 className="text-lg sm:text-xl font-semibold text-gray-900">
          Last 30 Days Expenses
        </h5>
        <button
          onClick={onSeeMore}
          className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <span>See All</span>
          <LuArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="h-64 sm:h-80">
        {chartData.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-sm sm:text-base">No expense data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Last30DaysExpenses;
