// Description: Tweet Controller Layer

import { Router } from "express";
import * as service from "../service/index";

export const tweetRouter = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const tweets = await service.GetTweets();
    if (tweets) {
      return res.json(tweets);
    } else {
      return res.status(404).json({ message: "No tweets found" });
    }

    // res.set("Cache-Control", "public ,max-age=1000, s-maxage=1000")
    // return res.json([{ text: "test" }]);
  });

  router.post("/", async (req, res) => {
    const tweet = await service.CreateTweet(req.body);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    return res.json(tweet);
  });

  router.post("/follow", async (req, res) => {
    const { user_id, follow_user_id } = req.body;

    await service.UpdateFollowing(follow_user_id, user_id);

    return res.json({ message: "success" });
  });

  router.post("/unfollow", async (req, res) => {
    const { user_id, unfollow_user_id } = req.body;

    await service.UpdateUnfollow(unfollow_user_id, user_id);

    return res.json({ message: "success" });
  });

  return router;
};
