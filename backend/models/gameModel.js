import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    gameId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    followerCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
