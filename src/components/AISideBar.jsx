import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function AISideBar() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const userMessage = {
        role: "user",
        content: prompt,
      };
      setMessages((prev) => [...prev, userMessage]);
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content:
                "You are a productivity coach helping students focus and study effectively.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "Focus Studio",
          },
        },
      );
      const aiReply = response.data.choices[0].message.content;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply,
        },
      ]);
      setPrompt("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="h-125 min-h-165 overflow-y-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0, 0, 0, 0.37)] flex flex-col"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6">AI Assistant</h2>
      </div>
      <div className="space-y-4 wrap-break-word overflow-x-hidden">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl ${
              message.role === "user"
                ? "bg-blue-500/20 text-right"
                : "bg-white/10"
            }
            `}
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {message.content}
            </ReactMarkdown>
          </div>
        ))}
        {loading && <p className="text-gray-400">AI is thinking...</p>}
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI anything..."
          className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700 outline-none"
        />
        <button
          onClick={handleAskAI}
          className="bg-blue-500 px-4 rounded-xl hover:scale-105 transition-all duration-300"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
