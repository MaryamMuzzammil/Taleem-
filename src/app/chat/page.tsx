"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful learning assistant." },
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/taleem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch response.");

      const data = await res.json();

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Sorry, TaleemBot is not responding right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom on new message
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">TaleemBot Chat</h1>

      {/* Messages */}
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

      {/* Input Section */}
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
