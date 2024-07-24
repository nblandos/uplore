import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { getUserProfile, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:username", authenticateUser, getUserProfile);
// router.get("/suggested", authenticateUser, getSuggestedGames);
// router.get("/user/followed", authenticateUser, getUserFollowedGames); // may move to authRoutes?
// router.post("/follow/:gameId", authenticateUser, followUnfollowGame);
router.post("/update", authenticateUser, updateUser);

export default router;
