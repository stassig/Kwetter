// Description: Timeline Controller Layer

import { Router } from "express";
import * as service from "../service/index";

export const timelineRouter = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const timelines = await service.GetTimelines();
    if (timelines) {
      return res.json(timelines);
    } else {
      return res.status(404).json({ message: "No timelines found" });
    }

    // res.set("Cache-Control", "public ,max-age=1000, s-maxage=1000")
    // return res.json([{ text: "test" }]);
  });

  router.post("/", async (req, res) => {
    const timeline = await service.CreateTimeline(req.body);
    if (!timeline) {
      return res.status(404).json({ message: "timeline not found" });
    }
    return res.json(timeline);
  });

  return router;
};
