import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function AISideBar() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const userMessage = {
        role: "user",
        content: prompt,
      };
      setMessages((prev) => [...prev, userMessage]);
      setPrompt("");
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAskAI();
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="h-[87.8vh] overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0, 0, 0, 0.37)] flex flex-col"
    >
      <div className="p-5 border-b border-white/10 shrink-0">
        <h2 className="text-2xl text-white font-semibold">AI Focus Coach</h2>
        <p className="text-sm text-gray-300 mt-1">
          Ask for study plans, productivity help, summaries, and focus advice
        </p>
      </div>
      <div className=" flex-1 min-h-0 space-y-4 p-4 overflow-x-hidden overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-gray-400 text-sm">
            Start a conversation with your AI coach.
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }
            `}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl wrap-break-word shadow-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-br-sm"
                  : "bg-white/10 backdrop-blur-xl border border-white/10 text-gray-100 rounded-bl-sm"
              }`}
            >
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl text-gray-300">
             <div className="flex gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
             </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="p-4 border-t border-white/10 flex shrink-0">
        <div className="flex items-center w-full gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI anything..."
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 rounded-xl min-w-0 bg-white/10 border border-white/10  text-white placeholder-gray-400 outline-none"
          />
          <button
            onClick={handleAskAI}
            className="bg-blue-500 hover:bg-blue-600 shrink-0 whitespace-nowrap px-4 py-2 rounded-xl hover:scale-105 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}
