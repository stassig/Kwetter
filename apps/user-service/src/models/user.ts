import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  profile_image_id: { type: Number, default: null },
  bio: { type: String, default: null },
  role: { type: String, default: "user" },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
