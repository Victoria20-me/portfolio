import { useState, useEffect } from "react";
import FocusRing from "./FocusRing";
import { motion } from "framer-motion";

export default function FocusTracker({
  focusScore,
  setFocusScore,
  updateAnalytics,
  completedTasks,
}) {
  const [distractionCount, setDistractionCount] = useState(0);
  const [warning, setWarning] = useState("");

  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsTabActive(false);
        setDistractionCount((prev) => prev + 1);
        setWarning("Please stay focused!");
        setFocusScore((prev) => (prev > 0 ? prev - 10 : 0));
        updateAnalytics(completedTasks, focusScore - 10);
      } else {
        setIsTabActive(true);
        setTimeout(() => {
          setWarning("");
        }, 3000);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-80 bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] border border-white/20  hover:translate-y-1 hover:shadow-blue-500/20 transition-all duration-300"
    >
      <h2 className="text-xl font-semibold mb-4">Focus Tracker</h2>
      <div className="flex justify-center items-center mt-3">
        <FocusRing focusScore={focusScore} />
      </div>
      <div className="mt-6 text-center">
        <p className="mb-3 p-4 ">Distraction:{distractionCount}</p>

        <p
          className={`font-semibold ${
            warning ? "text-red-400" : "text-green-400"
          }`}
        >
          {warning || "You're focused 🔥"}
        </p>
      </div>
    </motion.div>
  );
}
