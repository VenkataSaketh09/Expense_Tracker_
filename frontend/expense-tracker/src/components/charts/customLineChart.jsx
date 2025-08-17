import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { addThousandsSeparator } from "../../utils/helper";

const CustomLineChart = ({ data, title }) => {
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
        <AreaChart
          data={data}
          margin={{ top: 20, right: 15, left: 10, bottom: 40 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            fontSize={12}
            stroke="#64748b"
            axisLine={false}
            tickLine={false}
            dy={10}
            tick={{ fill: "#64748b" }}
          />
          <YAxis
            fontSize={12}
            stroke="#64748b"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>  `${addThousandsSeparator(value)}`}
            domain={[0, "dataMax"]}
            tick={{ fill: "#64748b" }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      {label}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Amount:</span>{" "}
                        <span className="font-bold text-purple-600">
                          ₹{addThousandsSeparator(payload[0].value)}
                        </span>
                      </p>
                      {data.category && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Category:</span>{" "}
                          <span className="text-gray-900">{data.category}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ stroke: "#8b5cf6", strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="url(#colorGradient)"
            dot={{
              fill: "#8b5cf6",
              strokeWidth: 3,
              stroke: "#ffffff",
              r: 5,
            }}
            activeDot={{
              r: 7,
              fill: "#8b5cf6",
              stroke: "#ffffff",
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;