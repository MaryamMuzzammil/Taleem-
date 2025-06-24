"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"; 

export default function TestPage() {
 const messages = useQuery(api.message.getMessages); 

  return (
    <div className="min-h-screen p-8 bg-zinc-900 text-white">
      <h1 className="text-2xl font-bold mb-6">📨 Convex Messages</h1>

      {messages ? (
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="bg-zinc-800 p-4 rounded shadow">
              <p><strong>{msg.role}:</strong> {msg.content}</p>
              <p className="text-sm text-gray-400">User: {msg.userId}</p>
              <p className="text-xs text-gray-500">Time: {new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Loading messages...</p>
      )}
    </div>
  );
}
