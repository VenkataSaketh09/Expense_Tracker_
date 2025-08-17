import React from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = [
  "#8B5CF6", // Purple
  "#EF4444", // Red
  "#F59E0B", // Orange
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F97316", // Orange-600
  "#8B5A2B", // Brown
  "#EC4899", // Pink
];

const IncomeSourcesChart = ({ transactions }) => {
  // Group income by source and sum amounts
  const groupedData = transactions?.reduce((acc, transaction) => {
    const source = transaction.source || "Other";
    if (acc[source]) {
      acc[source].amount += parseFloat(transaction.amount) || 0;
    } else {
      acc[source] = {
        name: source,
        amount: parseFloat(transaction.amount) || 0,
      };
    }
    return acc;
  }, {});

  // Get all sources by amount (no limit to show all sources)
  const chartData = Object.values(groupedData || {})
    .sort((a, b) => b.amount - a.amount)
    .filter((source) => source.amount > 0); // Only show sources with positive amounts

  const totalIncome = chartData.reduce((sum, source) => sum + source.amount, 0);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 h-full">
      <div className="mb-4 sm:mb-6">
        <h5 className="text-lg sm:text-xl font-semibold text-gray-900">
          Last 60 Days Income
        </h5>
      </div>
      <div className="h-64 sm:h-80">
        {chartData.length > 0 ? (
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`₹${totalIncome.toLocaleString()}`}
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
