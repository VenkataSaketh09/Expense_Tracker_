import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionsInfoCard from "../cards/TransactionsInfoCard";
import moment from "moment";

const First5Expenses = ({ transactions, onSeeMore }) => {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h5 className="text-lg sm:text-xl font-semibold text-gray-900">
          Expenses
        </h5>
        <button
          onClick={onSeeMore}
          className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <span>See All</span>
          <LuArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionsInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("DD-MMM-YYYY")}
            amount={expense.amount}
            type={expense.type || "expense"}
            hideDeleteBtn
          />
        ))}
        {(!transactions || transactions.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm sm:text-base">
              No expense transactions found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default First5Expenses;
