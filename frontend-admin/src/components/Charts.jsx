import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend
} from "recharts";

export default function Charts({ data }) {

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: 30,
        background: "white",
        padding: 30,
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
      }}
    >
      <h3 style={{ marginBottom: 20 }}>
        Feedback Trend 📈
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E2E8F0"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{ fill: "#64748B", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#64748B", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "white",
              borderRadius: 10,
              border: "none",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
            }}
          />

          <Legend />

          {/* 🎨 Gradients */}
          <defs>
            <linearGradient id="positiveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="neutralGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="negativeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* 🔹 POSITIVE */}
          <Area type="monotone" dataKey="positive" stroke="none" fill="url(#positiveGrad)" />
          <Line
            type="monotone"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

          {/* 🔸 NEUTRAL */}
          <Area type="monotone" dataKey="neutral" stroke="none" fill="url(#neutralGrad)" />
          <Line
            type="monotone"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

          {/* 🔻 NEGATIVE */}
          <Area type="monotone" dataKey="negative" stroke="none" fill="url(#negativeGrad)" />
          <Line
            type="monotone"
            stroke="#EF4444"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
