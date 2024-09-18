<template>
    <div class=" mx-20">
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else>
   
        <div v-for="(games, category) in categorizedGames" :key="category" class="mb-8">
          <h2 class="text-2xl text-white gameheader p-6 font-bold mb-4">Best In {{ category }}</h2>
          <div class="grid grid-cols-2 gap-4">
            <router-link v-for="game in games" :key="game.id" :to="`/category/${game.category}/${game.title}`" class="bg-[rgba(255,255,255,.2)] flex shadow-lg rounded-lg overflow-hidden">
              <img :src="game.images[0]" alt="Game Image" class="min-w-[200px] min-h-[300px] max-w-[200px] max-h-[300px]  object-cover"/>
              <div class="p-1">
                <h3 class="text-xl text-white gameheader p-3 font-semibold">{{ game.title }}</h3>
                <p class="text-white">{{ game.description }}</p>
                <div class="mt-4">
                  <span class="text-sm font-medium text-white">Rating: {{ game.ratings.average_rating }}</span>
                  <span class="text-sm font-medium text-white ml-4">{{ game.ratings.total_reviews }} reviews</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
    name: 'HelloWorld',
    data() {
      return {
        games: [],
        loading: true,
      };
    },
    computed: {
      categorizedGames() {
        return this.games.reduce((acc, game) => {
          if (!acc[game.category]) {
            acc[game.category] = [];
          }
          acc[game.category].push(game);
          return acc;
        }, {});
      },
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:3000/games');
        this.games = response.data;
       
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        this.loading = false;
      }
    },
  };
  
</script>
  
  <style scoped>
  /* Add any additional scoped styles here */
  .gameheader{
    background: rgba(255, 255, 255, .1);
    backdrop-filter: blur(10px);
    border-bottom: 2px solid rgba(255, 255, 255, .2);
 
}
  </style>
  