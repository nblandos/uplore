import express from "express";

import { authenticateUser } from "../middleware/authenticateUser.js";
import {
  getUserProfile,
  updateUser,
  followUnfollowGame,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:username", authenticateUser, getUserProfile);
router.post("/follow/:gameId", authenticateUser, followUnfollowGame);
router.post("/update", authenticateUser, updateUser);

export default router;
