import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  username: { type: String, unique: true },
  profile_image_url: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
