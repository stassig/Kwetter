// Description: Declaration / Main File

import { createServer } from "./server";
import { timelineRouter } from "./routes";
import { startListening } from "./event-bus";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env.local" });

const port = 3003; // put the ports as env variables as well

// !TO DO: Fix env variables to work with docker

// MongoDB connection string
const mongoURI =
  process.env.DB_URL_TIMELINE ||
  "mongodb+srv://stassig:LLy9oetA2323VOFY@kwetterdb.dv7mwqw.mongodb.net/Timelines";

if (!mongoURI) {
  throw new Error("Please set DB_URL_TIMELINE in your .env file");
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start listening to RabbitMQ
startListening();

const server = createServer();

server.use("/", timelineRouter());

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
