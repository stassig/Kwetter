// Description: Declaration / Main File

import { createServer } from "./server";
import { tweetRouter } from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env.local" });

const port = 3001;

// MongoDB connection string
const mongoURI = process.env.DB_URL_TWEET;

if (!mongoURI) {
  throw new Error("Please set MONGO_URI in your .env file");
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const server = createServer();

server.use("/", tweetRouter());

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
