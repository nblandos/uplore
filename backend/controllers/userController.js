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
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

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

//     const isFollowing = user.gameFollowing.includes(gameId);

//     if (isFollowing) {
//       user.gameFollowing = user.gameFollowing.filter(
//         (game) => game.toString() !== gameId,
//       );
//     } else {
//       // await Game.findByIdAndUpdate(gameId, { $inc: { followers: 1 } }); // Increment followers count of game
//       user.gameFollowing.push(gameId);
//     }

//     await user.save();
//     return res.status(200).json(user.gameFollowing);
//   } catch (error) {
//     console.log("Error in followUnfollowGame controller: ", error.message);
//     return res.status(500).json({
//       error: "Internal server error",
//     });
//   }
// };
