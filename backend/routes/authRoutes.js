import express from "express";
import {
  login,
  logout,
  signup,
  getAuthenticatedUser,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);
router.get("/user", authenticateUser, getAuthenticatedUser);

export default router;
