import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { searchGames } from "../controllers/gameController.js";

const router = express.Router();

// public routes - can be accessed by anyone
router.get("/games/search", searchGames);
// router.get("/popular", getPopularGames);
// router.get("/:gameId", getGameDetails); // gameID may be igdbID not sure how IGDB ids work yet

// // private routes - user must be logged in
// router.post("/follow", authenticateUser, followGame); // may combine follow/unfollow (also keep in userRoutes)
// router.post("/unfollow", authenticateUser, unfollowGame);
// router.get("/user/followed", authenticateUser, getUserFollowedGames); // may move to userRoutes?

export default router;
