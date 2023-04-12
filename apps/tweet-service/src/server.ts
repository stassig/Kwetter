// Description: Server Instance & Configuration

import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

// Export the createServer function
export const createServer = () => {
  // Create a new express app
  const app = express();
  // Chain app configurations and middlewares
  app
    // Disable the 'x-powered-by' HTTP header
    .disable("x-powered-by")
    // Add the morgan middleware for logging HTTP requests in 'dev' format
    .use(morgan("dev"))
    // Add the urlencoded middleware for parsing URL-encoded request bodies
    .use(urlencoded({ extended: true }))
    // Add the json middleware for parsing JSON request bodies
    .use(json())
    // Add the CORS middleware to allow cross-origin requests
    .use(cors())
    // Define a GET route for health check purposes
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  // Return the configured express app
  return app;
};
