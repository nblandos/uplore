import igdbService from "../services/igdbService.js";
import { getOrCreateGame } from "../services/gameService.js";

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

export const getGameDetails = async (req, res) => {
  try {
    const { gameId } = req.params;

    let game = await getOrCreateGame(gameId);

    game.views += 1;
    await game.save();

    return res.status(200).json(game);
  } catch (error) {
    console.log("Error in getGameDetails controller: ", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
