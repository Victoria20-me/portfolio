import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TaskList({ setCompletedTasks, updateAnalytics, completedTasks, focusScore }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedCompleted = !task.completed;

          setCompletedTasks((prev) => (updatedCompleted ? prev + 1 : prev - 1));
          updateAnalytics(completedTasks + 1, focusScore);

          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }),
    );
  };
  console.log(tasks);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-80 bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] border border-white/20 hover:-translate-y-1 hover:shadow-blue-500/20 transition-all duration-300"
    >
      <h2 className="text-xl mb-6 font-semibold">Tasks</h2>
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:scale-105 transition duration-300"
        >
          Add
        </button>
      </div>
      <div className="max-h-37.5 pr-2 overflow-y-auto bg-white/5 border border-white/10 p-3 rounded-xl mt-6 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center gap-4"
          >
            <p
              onClick={() => toggleTask(task.id)}
              className={`flex-1 wrap-break-word cursor-pointer transition-all duration-300 ${
                task.completed ? "line-through text-gray-500" : "text-white"
              }
              `}
            >
              {task.text}
            </p>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 px-3 py-1 rounded hover:scale-105 transition duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
