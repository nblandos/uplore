import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
class IGDBService {
  constructor() {
    this.clientId = process.env.IGDB_CLIENT_ID;
    this.clientSecret = process.env.IGDB_CLIENT_SECRET;
    this.accessToken = null;
    this.tokenExpiration = null;
    this.baseURL = "https://api.igdb.com/v4";
    this.tokenURL = "https://id.twitch.tv/oauth2/token";
  }

  async getAccessToken() {
    try {
      const response = await axios.post(`${this.tokenURL}`, null, {
        params: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: "client_credentials",
        },
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiration = Date.now() + response.data.expires_in * 1000;
    } catch (error) {
      console.log(
        "Error in getAccessToken: ",
        error.message,
        error.response?.data,
      );
      throw error;
    }
  }

  async validateAccessToken() {
    if (!this.accessToken || Date.now() >= this.tokenExpiration) {
      await this.getAccessToken();
    }
  }

  async makeRequest(endpoint, query) {
    await this.validateAccessToken();

    try {
      const response = await axios.post(`${this.baseURL}/${endpoint}`, query, {
        headers: {
          "Client-ID": this.clientId,
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(
        "Error in makeRequest: ",
        error.message,
        error.response?.data,
      );
      throw error;
    }
  }

  async searchGames(
    searchQuery,
    { fields = "name, summary, websites", limit = 200 } = {},
  ) {
    const query = `
      search "${searchQuery}";
      fields ${fields};
      limit ${limit};
    `;

    try {
      const response = await this.makeRequest("games", query);
      return response;
    } catch (error) {
      console.error(
        "Error in searchGames: ",
        error.message,
        error.response?.data,
      );
      throw error;
    }
  }

  async getGameById(gameId, { fields = "name" } = {}) {
    const query = `
      fields ${fields};
      where id = ${gameId};
    `;

    try {
      const response = await this.makeRequest("games", query);
      return response[0]; //  response is an array with one element as id is unique
    } catch (error) {
      console.error(
        "Error in getGameById: ",
        error.message,
        error.response?.data,
      );
      throw error;
    }
  }
}

export default new IGDBService();
