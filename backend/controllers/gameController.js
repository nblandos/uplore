import Game from "../models/gameModel.js";
import igdbService from "../services/igdbService.js";

export const searchGames = async (req, res) => {
  try {
    const { query } = req.query;
    const games = await igdbService.searchGames(query);
    return res.status(200).json(games);
  } catch (error) {
    console.log("Error in searchGames controller: ", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
