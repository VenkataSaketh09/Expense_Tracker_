import React from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import { useState } from "react";
import { useEffect } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      console.log("Raw transactions data:", transactions);
      const result = prepareIncomeBarChartData(transactions);
      console.log("Processed chart data:", result);
      setChartData(result);
    } else {
      setChartData([]);
    }
    return () => {};
  }, [transactions]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div className="flex-1">
          <h5 className="text-lg sm:text-xl font-semibold text-gray-900">
            Income Overview
          </h5>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-purple-600 hover:cursor-pointer hover:bg-violet-100 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap"
          onClick={onAddIncome}
        >
          <LuPlus className="text-base sm:text-lg" />
          <span className="hidden sm:inline">Add Income</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Chart Container with responsive height */}
      <div className="h-64 sm:h-80 w-full">
        {chartData && chartData.length > 0 ? (
          <CustomBarChart data={chartData} title={"Income Data"} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-lg font-medium text-gray-600 mb-2">
                No income data available
              </p>
              <p className="text-sm text-gray-500">
                Add your first income to see the chart
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
