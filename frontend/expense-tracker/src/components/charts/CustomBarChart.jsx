import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const CustomBarChart = ({ data, title }) => {
  // If no data, show empty state
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            fontSize={12}
            stroke="#6b7280"
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            fontSize={12}
            stroke="#6b7280"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
            domain={[0, 'dataMax + 1000']}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {label}
                    </p>
                    <p className="text-sm text-gray-600">
                      Amount:{" "}
                      <span className="font-semibold text-purple-600">
                        ${payload[0].value}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
          />
          <Bar 
            dataKey="amount" 
            fill="#8B5CF6" 
            radius={[8, 8, 0, 0]}
            maxBarSize={100}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;