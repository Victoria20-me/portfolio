export default function StatsCard({ completedTasks }) {
  return (
    <div className="min-h-{260px} bg-white backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)] flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4">Productivity Stats</h2>
      <p className="text-5xl font-bold text-blue-400">{completedTasks}</p>
      <p className="text-gray-300 mt-2">Tasks Completed</p>
    </div>
  );
}
