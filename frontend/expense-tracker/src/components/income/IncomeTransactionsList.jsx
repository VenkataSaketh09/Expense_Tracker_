import React from "react";
import { LuTrash2, LuTrendingUp, LuDownload } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import moment from "moment";

const IncomeTransactionsList = ({ transactions, onDelete, onDownload }) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Income Sources
          </h3>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            disabled
          >
            <LuDownload className="text-base sm:text-lg" />
            <span className="hidden sm:inline">Download</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
        <div className="text-center py-12">
          <div className="text-4xl mb-4">💰</div>
          <p className="text-lg font-medium text-gray-600 mb-2">
            No income sources yet
          </p>
          <p className="text-sm text-gray-500">
            Add your first income to see it here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Income Sources
        </h3>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-purple-600 rounded-lg hover:bg-violet-100 hover:cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap"
        >
          <LuDownload className="text-base sm:text-lg" />
          <span className="hidden sm:inline">Download</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center text-lg sm:text-xl shadow-sm flex-shrink-0">
                  {transaction.icon || "💰"}
                </div>

                {/* Transaction Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {transaction.source}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {moment(transaction.date).format("Do MMM YYYY")}
                  </p>
                </div>
              </div>

              {/* Amount and Actions */}
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                <div className="bg-green-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2">
                  <span className="text-green-600 font-semibold text-xs">
                    + ₹{addThousandsSeparator(transaction.amount)}
                  </span>
                  <LuTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                </div>
                <button
                  onClick={() => onDelete(transaction)}
                  className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-colors group"
                  title="Delete income"
                >
                  <LuTrash2
                    size={12}
                    className="sm:w-3.5 sm:h-3.5 text-gray-400 group-hover:text-red-500 transition-colors"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeTransactionsList;