<template>
    <div>
      <div v-if="games.length" class="mx-32">
        <h1 class="text-2xl text-white gameheader mt-6 p-4 font-bold flex items-center">
          <button @click="backfunction()" class="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
          </button>
          {{ categoryMessage }}
        </h1>
        <div class="grid grid-cols-1  gap-6 mt-4">
          <router-link 
            v-for="(game, index) in games" 
            :key="index" 
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
        </div>
      </div>
      <div v-else class="mx-4 md:mx-20 mt-8">
        <p class="text-white text-center">No games found for this category.</p>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
    data() {
      return {
        games: [], // To store fetched games data
      };
    },
    computed: {
      categoryName() {
        return this.$route.params.categoryName;
      },
      categoryMessage() {
        return `${this.categoryName} games`;
      }
    },
    methods: {
      fetchGames() {
        axios
          .get('http://localhost:3000/games')
          .then((response) => {
            // Filter games by category
            this.games = response.data.filter(
              (game) => game.category.toLowerCase() === this.categoryName.toLowerCase()
            );
          })
          .catch((error) => {
            console.error("Error fetching games:", error);
          });
      },
  
      backfunction() {
        this.$router.go(-1); 
      }
    },
    created() {
      this.fetchGames(); // Fetch games when the component is created
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
  