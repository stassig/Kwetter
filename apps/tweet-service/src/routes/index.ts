// Description: Tweet Controller Layer

import { Router } from "express";
import * as service from "../service/index";

export const tweetRouter = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    res.set("Cache-Control", "public ,max-age=10, s-maxage=30")
    return res.json([]);
//     const tweets = await service.GetTweets();
//     if (tweets) {
//       return res.json(tweets);
//     } else {
//       return res.status(404).json({ message: "No tweets found" });
//     }
  });

  router.post("/", async (req, res) => {
    const tweet = await service.CreateTweet(req.body);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    return res.json(tweet);
  });

  return router;
};
