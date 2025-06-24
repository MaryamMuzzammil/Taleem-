"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api"; 
import { useUser } from "@clerk/nextjs";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful learning assistant." },
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const { user } = useUser(); // Clerk user
  const saveMessage = useMutation(api.message.saveMessage); // Convex mutation

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Save user message to Convex
    await saveMessage({
      userId: user.id,
      role: "user",
      content: input,
      timestamp: Date.now(),
    });

    try {
      const res = await fetch("/api/taleem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const aiReply = {
        role: "assistant",
        content: data.reply,
      };

      // Save AI message to Convex
      await saveMessage({
        userId: user.id,
        role: "assistant",
        content: data.reply,
        timestamp: Date.now(),
      });

      setMessages([...updatedMessages, aiReply]);
    } catch (err) {
      const fallback = {
        role: "assistant",
        content:
          "Sorry, TaleemBot is not responding right now. Please try again later.",
      };

      await saveMessage({
        userId: user.id,
        role: "assistant",
        content: fallback.content,
        timestamp: Date.now(),
      });

      setMessages([...updatedMessages, fallback]);
    }

    setLoading(false);
  };

  // Auto-scroll
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">TaleemBot Chat</h1>

      <div className="flex flex-col gap-3 mb-28">
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, i) => (
            <div
              key={i}
              className={`max-w-xl px-4 py-2 rounded-xl whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-700 self-end ml-auto"
                  : "bg-zinc-800 self-start"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "TaleemBot"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
        {loading && (
          <p className="text-sm italic text-gray-400 ml-2">
            TaleemBot is typing...
          </p>
        )}
        <div ref={chatRef} />
      </div>

      {/* Input section */}
      <div className="fixed bottom-4 left-0 right-0 px-4 max-w-2xl mx-auto flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 rounded-lg p-3 bg-zinc-800 text-white outline-none"
          placeholder="Type your question here..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}