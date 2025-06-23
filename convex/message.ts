import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
