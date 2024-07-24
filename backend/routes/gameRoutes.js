import express from "express";
import { searchGames, getGameDetails } from "../controllers/gameController.js";

const router = express.Router();

router.get("/games/search", searchGames);
router.get("/games/:gameId", getGameDetails);

export default router;
