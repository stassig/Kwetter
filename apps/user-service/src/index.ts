// Description: Declaration / Main File

import { createServer } from "./server";
import { userRouter } from "./routes";
import mongoose from "mongoose";
import { URL } from "url";

const url = new URL(
  process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:3002/user"
);
const port = url.port;

// MongoDB connection string
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://stassig:LLy9oetA2323VOFY@kwetterdb.dv7mwqw.mongodb.net/Users";

// Connect to MongoDB
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// const endPoint = process.env.NODE_ENV === "production" ? "/" : "/user";
const endPoint = process.env.NEXT_PUBLIC_USER_SERVICE_URL || "/user";

const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
  console.log(`endpoint: ${endPoint}`);
});

server.use(endPoint, userRouter());
