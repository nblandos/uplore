import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:username", authenticateUser, getUserProfile);
// router.get("/suggested", authenticateUser, getSuggestedGames);
// router.post("/follow/:gameId", authenticateUser, followUnfollowGame); // Uncomment once game model done
// router.post("/update", authenticateUser, updateUser);

export default router;
