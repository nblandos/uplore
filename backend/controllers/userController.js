import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/userModel.js";
import { getOrCreateGame } from "../services/gameService.js";

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile controller: ", error.message);
    throw error;
  }
};

export const followUnfollowGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await getOrCreateGame(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const gameObjectId = game._id;
    const isFollowing = user.followedGames.some((fg) =>
      fg.game.equals(gameObjectId),
    );

    if (isFollowing) {
      user.followedGames = user.followedGames.filter(
        (fg) => !fg.game.equals(gameObjectId),
      );
    } else {
      user.followedGames.push({ game: gameObjectId });
    }

    game.followerCount = isFollowing
      ? Math.max(0, game.followerCount - 1)
      : game.followerCount + 1;

    await Promise.all([user.save(), game.save()]);

    return res.status(200).json({
      userId: user._id,
      username: user.username,
      followedGames: user.followedGames,
      isFollowing: !isFollowing,
      gameId: game._id,
      gameName: game.name,
      igdbId: game.gameId,
      gameFollowers: game.followerCount,
    });
  } catch (error) {
    console.log("Error in followUnfollowGame controller: ", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword, profilePic } =
      req.body; // may have to update for profilePic
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (profilePic) {
      if (user.profilePic) {
        const publicId = user.profilePic.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      user.profilePic = uploadedResponse.secure_url;
    }

    if (
      (!currentPassword && newPassword) ||
      (currentPassword && !newPassword)
    ) {
      return res.status(400).json({
        error: "Both current password and new password are required",
      });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters",
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    user.password = undefined;
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser controller: ", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
