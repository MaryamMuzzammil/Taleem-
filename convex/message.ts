import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";  // path relative to file

export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").take(10);
  },
});
export const saveMessage = mutation({
  args: {
    userId: v.string(),
    role: v.string(),
    content: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", args);
  },
});
