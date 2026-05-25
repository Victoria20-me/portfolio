import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsCard({ analyticsData }) {
  return (
    <div className="h-80 min-w-0 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:-translate-y-1 hover:shadow-blue-500/20 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-6">Productivity Analytics</h2>
      <div className="h-55 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="focusScore"
              stroke="#3B82F6"
              strokeWidth={3}
              animationDuration={500}
            />
            <Line
              type="monotone"
              dataKey="completedTasks"
              stroke="#22C55e"
              strokeWidth={3}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
