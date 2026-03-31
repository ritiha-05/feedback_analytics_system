import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart
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

          {/* ⭐ SOFT GRID (Stripe style) */}
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

          {/* ⭐ MODERN TOOLTIP */}
          <Tooltip
            contentStyle={{
              background: "white",
              borderRadius: 10,
              border: "none",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
            }}
          />

          {/* ⭐ STRIPE-STYLE GRADIENT */}
          <defs>
            <linearGradient id="stripeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* ⭐ AREA (soft background fill) */}
          <Area
            type="monotone"
            dataKey="negative"
            stroke="none"
            fill="url(#stripeGradient)"
          />

          {/* ⭐ MAIN LINE */}
          <Line
            type="monotone"
            dataKey="negative"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#6366F1"
            }}
            activeDot={{
              r: 7,
              fill: "#6366F1",
              stroke: "#fff",
              strokeWidth: 2
            }}
            animationDuration={700}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
