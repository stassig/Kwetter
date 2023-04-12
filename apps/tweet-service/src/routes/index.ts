// Description: Tweet Controller Layer

import { Router } from "express";
import * as service from "../service/index";

export const tweetRouter = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    const tweet = await service.CreateTweet(req.body);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    return res.json(tweet);
  });

  return router;
};
