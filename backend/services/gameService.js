import Game from "../models/gameModel.js";
import igdbService from "../services/igdbService.js";

// Retrieves game from the database adding it if it doesn't exist
export const getOrCreateGame = async (gameId) => {
  try {
    let game = await Game.findOne({ gameId });

    if (!game) {
      const igdbGame = await igdbService.getGameById(gameId);

      game = new Game({
        gameId: igdbGame.id,
        name: igdbGame.name,
      });
    }

    return game;
  } catch (error) {
    console.log("Error in getOrCreateGame service: ", error.message);
    throw error;
  }
};
