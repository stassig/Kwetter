// Description: Timeline Controller Layer

import { Router } from "express";
import * as service from "../service/index";

export const timelineRouter = () => {
  const router = Router();

  router.get("/:id", async (req, res) => {
    const timeline = await service.GetTimeline(req.params.id);
    if (timeline) {
      return res.json(timeline);
    } else {
      return res.status(404).json({ message: "No timeline found" });
    }
  });

  return router;
};
