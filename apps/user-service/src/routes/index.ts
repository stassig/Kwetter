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

  router.get("/:id", async (req, res) => {
    const user = await service.GetUserById(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: "No user found" });
    }
  });

  router.get("/check/:username", async (req, res) => {
    const user = await service.GetUserByUsername(req.params.username);
    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });

  router.post("/", async (req, res) => {
    const user = await service.CreateUser(req.body);
    if (!user) {
      return res.status(404).json({ message: "Error creating a user" });
    }
    return res.json(user);
  });

  return router;
};
