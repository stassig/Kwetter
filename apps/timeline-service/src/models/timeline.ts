import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  tweet_ids: [String],
  last_updated: { type: Date, default: Date.now },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
