<template>
    <div class="addGame">
      <div class="  flex flex-col items-center justify-center p-4">
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-white">Add Games</h1>
      </header>
      
      <section class="bg-[rgba(255,255,255,.2)] text-white shadow-md rounded-lg p-6 max-w-4xl w-full">
        <form @submit.prevent="addGame" class=" px-8 pt-6 pb-8 mb-4">
      <div class="grid grid-cols-2 gap-6">
        
        <div>
          <label for="title" class="block text-white text-sm font-bold mb-2">Game Title:</label>
          <input type="text" v-model="game.title" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>

        <div>
          <label for="images" class="block text-white text-sm font-bold mb-2">Image URL:</label>
          <input type="text" v-model="game.images[0]" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
        
        <div class="col-span-2">
          <label for="description" class="block text-white text-sm font-bold mb-2">Description:</label>
          <textarea v-model="game.description" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"></textarea>
        </div>
  
        <div>
          <label for="os" class="block text-white text-sm font-bold mb-2">OS:</label>
          <input type="text" v-model="game.system_requirements.os" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
        <div>
          <label for="processor" class="block text-white text-sm font-bold mb-2">Processor:</label>
          <input type="text" v-model="game.system_requirements.processor" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
        <div>
          <label for="memory" class="block text-white text-sm font-bold mb-2">Memory:</label>
          <input type="text" v-model="game.system_requirements.memory" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
        <div>
          <label for="graphics" class="block text-white text-sm font-bold mb-2">Graphics:</label>
          <input type="text" v-model="game.system_requirements.graphics" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
        <div>
          <label for="directx" class="block text-white text-sm font-bold mb-2">DirectX Version:</label>
          <input type="text" v-model="game.system_requirements.directx" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
        <div>
          <label for="storage" class="block text-white text-sm font-bold mb-2">Storage:</label>
          <input type="text" v-model="game.system_requirements.storage" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
        <div>
          <label for="sound_card" class="block text-white text-sm font-bold mb-2">Sound Card:</label>
          <input type="text" v-model="game.system_requirements.sound_card" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  

  
        <div>
          <label for="category" class="block text-white text-sm font-bold mb-2">Category:</label>
          <input type="text" v-model="game.category" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
        <div>
          <label for="average_rating" class="block text-white text-sm font-bold mb-2">Average Rating:</label>
          <input type="number" v-model="game.ratings.average_rating" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
        <div>
          <label for="total_reviews" class="block text-white text-sm font-bold mb-2">Total Reviews:</label>
          <input type="number" v-model="game.ratings.total_reviews" required class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
        </div>
  
      </div>
      <div class="mt-6 text-center">
        <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Add Game
        </button>
      </div>
    </form>
      </section>
    </div>
  </div>
  </template>

<script>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Use to generate unique IDs

export default {
  data() {
    return {
      game: {
        id: '', // Auto-generated in the frontend
        title: '',
        description: '',
        system_requirements: {
          os: '',
          processor: '',
          memory: '',
          graphics: '',
          directx: '',
          storage: '',
          sound_card: ''
        },
        images: [''],
        category: '',
        ratings: {
          average_rating: 0,
          total_reviews: 0
        }
      }
    };
  },
  methods: {
    async addGame() {
      // Generate a unique ID
      this.game.id = uuidv4();

      try {
        // Send POST request to the API
        const response = await axios.post('http://localhost:3000/games', this.game);
        console.log('Game added successfully:', response.data);
        alert('Game added successfully!');
      } catch (error) {
        console.error('Error adding game:', error);
        alert('Failed to add game.');
      }
    }
  }
};
</script>
  