"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { exam: "E1", score: 62 },
  { exam: "E2", score: 71 },
  { exam: "E3", score: 69 },
  { exam: "E4", score: 78 },
  { exam: "E5", score: 81 },
  { exam: "E6", score: 86 },
];

export default function PerformanceChart() {
  return (
    <div className="h-72 w-full">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis dataKey="exam" />

          <YAxis
            domain={[0, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}