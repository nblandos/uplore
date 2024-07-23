import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";

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

// export const getSuggestedGames = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const followedGames = await User.findById(userId).select("followedGames");

//     // method to suggest similar games based on games followed here

//   } catch (error) {
//     console.log("Error in getSuggestedGames controller: ", error.message);
//     return res.status(500).json({
//       error: "Internal server error",
//     });

//   }

// export const followUnfollowGame = async (req, res) => {
//   try {
//     const { gameId } = req.params;

//     const game = await Game.findById(gameId); // Find game by ID (game model not yet implemented)
//     const user = await User.findById(req.user._id);

//     if (!game) {
//       return res.status(404).json({ error: "Game not found" });
//     }
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const isFollowing = user.followedGames.includes(gameId);

//     if (isFollowing) {
//       user.followedGames = user.followedGames.filter(
//         (game) => game.toString() !== gameId,
//       );
//     } else {
//       // await Game.findByIdAndUpdate(gameId, { $inc: { followers: 1 } }); // Increment followers count of game
//       user.followedGames.push(gameId);
//     }

//     await user.save();
//     return res.status(200).json(user.followedGames);
//   } catch (error) {
//     console.log("Error in followUnfollowGame controller: ", error.message);
//     return res.status(500).json({
//       error: "Internal server error",
//     });
//   }
// };

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
