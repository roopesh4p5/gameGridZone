<template>
    <div>
      <div v-if="games.length" class="mx-32">
        <h1 class="text-2xl text-white gameheader mt-6 p-4 font-bold flex items-center">
          <!-- <button @click="backfunction()" class="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
          </button> -->
          {{ categoryMessage }}
        </h1>
        <div class="grid grid-cols-1  gap-12 mt-4">

        <div  v-for="(game, index) in games" 
        :key="index" >

       
          <router-link 
           
            :to="`/category/${categoryName}/${game.title}`" 
            class="bg-[rgba(255,255,255,.2)] flex shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img :src="game.images[0]" alt="Game Image" class="w-48 h-72 object-cover"/>
            <div class="p-4 w-full">
              <h3 class="text-xl text-white gameheader font-semibold">{{ game.title }}</h3>
              <p class="text-white mt-2">{{ game.description }}</p>
              <div class="mt-4 flex items-center">
                <span class="text-sm font-medium text-white">Rating: {{ game.ratings.average_rating }} / 10</span>
                <span class="text-sm font-medium text-white ml-4">{{ game.ratings.total_reviews }} reviews</span>
              </div>
            </div>
          </router-link>
          <button v-if="isAdmin" :click="deleteGame" class="p-3 border-x-0 border-y-2 rounded min-w-32  bottom-4 bg-[#ff0000a1] text-white">Delete</button>
        </div>
        </div>
      </div>
      <div v-else class="mx-4 md:mx-20 mt-8">
        <p class="text-white text-center">No games found for this category.</p>
      </div>
    </div>
  </template>
  
  <script>
import { apiService } from '@/services/apis';

export default {
    name: 'GameCategory',  // Add a name to your component for easier debugging
  
    data() {
      return {
        games: [],
        loading: true,
        error: null,
      };
    },
  
    computed: {
      categoryName() {
        return this.$route.params.categoryName;
      },
      categoryMessage() {
        return `${this.categoryName} games`;
      },
      isAdmin() {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          return user.role === 'admin';
        }
        return false;
      },
    },
  
    methods: {
      async fetchGames() {
        this.loading = true;
        this.error = null;
        try {
          const allGames = await apiService.getAllGames();
          this.games = allGames.filter(
            (game) => game.category.toLowerCase() === this.categoryName.toLowerCase()
          );
        } catch (error) {
          console.error("Error fetching games:", error);
          this.error = "Failed to fetch games. Please try again later.";
        } finally {
          this.loading = false;
        }
      },
  
      async deleteGame(gameId) {
        if (!confirm('Are you sure you want to delete this game?')) {
          return;
        }
  
        try {
          await apiService.deleteGame(gameId);
          this.games = this.games.filter(game => game.id !== gameId);
          this.$toast.success('Game deleted successfully');
        } catch (error) {
          console.error('Delete game error:', error);
          this.$toast.error('Failed to delete the game. Please try again.');
        }
      },
  
      backFunction() {
        this.$router.go(-1);
      },
  
      async addGame(gameData) {
        try {
          const newGame = await apiService.addGame(gameData);
          this.games.push(newGame);
          this.$toast.success('Game added successfully');
        } catch (error) {
          console.error('Add game error:', error);
          this.$toast.error('Failed to add the game. Please try again.');
        }
      },
  
      async updateGame(gameId, updatedData) {
        try {
          const updatedGame = await apiService.updateGame(gameId, updatedData);
          const index = this.games.findIndex(game => game.id === gameId);
          if (index !== -1) {
            this.games.splice(index, 1, updatedGame);
          }
          this.$toast.success('Game updated successfully');
        } catch (error) {
          console.error('Update game error:', error);
          this.$toast.error('Failed to update the game. Please try again.');
        }
      },
    },
  
    created() {
      this.fetchGames();
    },
  
    watch: {
      // Re-fetch games if the category changes
      categoryName: {
        handler: 'fetchGames',
        immediate: true
      }
    }
  };
  
</script>



  <style scoped>
  .games-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .game-card {
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 10px;
    width: 300px;
  }
  .game-card img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .gameheader{
    background: rgba(255, 255, 255, .1);
    backdrop-filter: blur(10px);
    border-bottom: 2px solid rgba(255, 255, 255, .2);
  }
  </style>
  