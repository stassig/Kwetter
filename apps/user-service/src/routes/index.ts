// Description: User Controller Layer

import { Router } from "express";
import * as service from "../service/index";

export const userRouter = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const users = await service.GetUsers();
    if (users) {
      return res.json(users);
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  });

  router.post("/", async (req, res) => {
    const user = await service.CreateUser(req.body);
    if (!user) {
      return res.status(404).json({ message: "Error creating a user" });
    }
    return res.json(user);
  });

  router.get("/crash", (req, res) => {
    process.exit(1);
  });

  return router;
};
