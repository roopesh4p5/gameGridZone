import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const apiService = {
  // Fetch all games
  async getAllGames() {
    try {
      const response = await axios.get(`${API_BASE_URL}/games`);
      return response.data;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  // Fetch slider data
  async getSliderData() {
    try {
      const response = await axios.get(`${API_BASE_URL}/slider`);
      return response.data;
    } catch (error) {
      console.error('Error fetching slides:', error);
      throw error;
    }
  },

  // Add a new game
  async addGame(gameData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/games`, gameData);
      return response.data;
    } catch (error) {
      console.error('Error adding game:', error);
      throw error;
    }
  },

  // Fetch game details by title
  async getGameByTitle(title) {
    try {
      const response = await axios.get(`${API_BASE_URL}/games/title=${encodeURIComponent(title)}`);
      console.log(response.data,"titleeeeeeeeeeeeeeee")

      return response.data; 
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
  },

  async deleteGame(gameId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/games/${gameId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  },

   // Fetch games by search query
   async searchGames(query) {
    try {
      const response = await axios.get(`${API_BASE_URL}/games/search=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching games by search query:', error);
      throw error;
    }
  },
  // User login
  async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // User registration
  async register(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
};