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
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => moment(value).format("DD/MM")}
            fontSize={12}
            stroke="#6b7280"
          />
          <YAxis
            fontSize={12}
            stroke="#6b7280"
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {moment(label).format("DD MMM YYYY")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Amount:{" "}
                      <span className="font-semibold text-gray-900">
                        ${payload[0].value}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="amount" fill="#dc2626" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
