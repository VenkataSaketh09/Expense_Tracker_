import React from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#8B5CF6", "#EF4444", "#F59E0B", "#3B82F6"];

const IncomeSourcesChart = ({ transactions }) => {
  // Group income by source and sum amounts
  const groupedData = transactions?.reduce((acc, transaction) => {
    const source = transaction.source || "Other";
    if (acc[source]) {
      acc[source].amount += transaction.amount;
    } else {
      acc[source] = {
        name: source,
        amount: transaction.amount,
      };
    }
    return acc;
  }, {});

  // Get top 5 sources by amount
  const top5Sources = Object.values(groupedData || {})
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const totalIncome = top5Sources.reduce(
    (sum, source) => sum + source.amount,
    0
  );

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 h-full">
      <div className="mb-4 sm:mb-6">
        <h5 className="text-lg sm:text-xl font-semibold text-gray-900">
          Last 60 Days Income
        </h5>
      </div>
      <div className="h-64 sm:h-80">
        {top5Sources.length > 0 ? (
          <CustomPieChart
            data={top5Sources}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            colors={COLORS}
            showTextAnchor={true}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-sm sm:text-base">No income data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeSourcesChart;
