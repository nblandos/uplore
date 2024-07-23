import mongoose from "mongoose";

// might cache game data?
// use this to store game follower count + id, possibly websites to scrape

const gameSchema = new mongoose.Schema(
  {
    igdbId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    followerCount: {
      type: Number,
      default: 0,
    },
    // add more fields if needed (such as websites - twitter)
    // add image fields, possible image urls?
  },
  { timestamps: true },
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
