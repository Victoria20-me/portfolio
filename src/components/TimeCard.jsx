import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TimerCard() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-80 bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] border border-white/20 hover:translate-y-1 hover:shadow-blue-500/20 transition-all duration-300"
    >
      <h2 className="text-xl mb-4 font-semi-bold">Focus Timer</h2>
      <div className="text-7xl mb-8 text-center tracking-widest font-light">
        {formatTime()}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:scale-105 transition duration-300"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="bg-gray-500 px-4 py-2 rounded-lg hover:scale-105 transition duration-300"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTime(25 * 60);
          }}
          className="bg-red-500 rounded-lg px-4 py-2 hover:scale-105 transition duration-300"
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
}
