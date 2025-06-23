import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    userId: v.string(),
    role: v.string(),        // 'user' or 'assistant'
    content: v.string(),
    timestamp: v.number(),   // Optional: to sort messages later
  }),
});
