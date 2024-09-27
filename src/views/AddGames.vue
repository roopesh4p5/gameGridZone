<template>
  <div class="addGame">
    <div class="flex flex-col items-center justify-center p-4">
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-white">Add Games</h1>
      </header>
      
      <section class="bg-[rgba(255,255,255,.2)] text-white shadow-md rounded-lg p-6 max-w-4xl w-full">
        <form @submit.prevent="addGame" class="px-8 pt-6 pb-8 mb-4">
          <div class="grid grid-cols-2 gap-6">
            
            <div>
              <label for="title" class="block text-white text-sm font-bold mb-2">Game Title:</label>
              <input type="text" v-model="v$.game.title.$model" :class="{'border-red-500': v$.game.title.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.title.$error" class="text-red-500 text-xs mt-1">{{ v$.game.title.$errors[0].$message }}</div>
            </div>

            <div>
              <label for="images" class="block text-white text-sm font-bold mb-2">Image URL:</label>
              <input type="text" v-model="v$.game.images.$model[0]" :class="{'border-red-500': v$.game.images.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.images.$error" class="text-red-500 text-xs mt-1">{{ v$.game.images.$errors[0].$message }}</div>
            </div>
            
            <div class="col-span-2">
              <label for="description" class="block text-white text-sm font-bold mb-2">Description:</label>
              <textarea v-model="v$.game.description.$model" :class="{'border-red-500': v$.game.description.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"></textarea>
              <div v-if="v$.game.description.$error" class="text-red-500 text-xs mt-1">{{ v$.game.description.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="os" class="block text-white text-sm font-bold mb-2">OS:</label>
              <input type="text" v-model="v$.game.system_requirements.os.$model" :class="{'border-red-500': v$.game.system_requirements.os.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.system_requirements.os.$error" class="text-red-500 text-xs mt-1">{{ v$.game.system_requirements.os.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="processor" class="block text-white text-sm font-bold mb-2">Processor:</label>
              <input type="text" v-model="v$.game.system_requirements.processor.$model" :class="{'border-red-500': v$.game.system_requirements.processor.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.system_requirements.processor.$error" class="text-red-500 text-xs mt-1">{{ v$.game.system_requirements.processor.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="memory" class="block text-white text-sm font-bold mb-2">Memory:</label>
              <input type="text" v-model="v$.game.system_requirements.memory.$model" :class="{'border-red-500': v$.game.system_requirements.memory.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.system_requirements.memory.$error" class="text-red-500 text-xs mt-1">{{ v$.game.system_requirements.memory.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="graphics" class="block text-white text-sm font-bold mb-2">Graphics:</label>
              <input type="text" v-model="v$.game.system_requirements.graphics.$model" :class="{'border-red-500': v$.game.system_requirements.graphics.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.system_requirements.graphics.$error" class="text-red-500 text-xs mt-1">{{ v$.game.system_requirements.graphics.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="directx" class="block text-white text-sm font-bold mb-2">DirectX Version:</label>
              <input type="text" v-model="v$.game.system_requirements.directx.$model" :class="{'border-red-500': v$.game.system_requirements.directx.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.system_requirements.directx.$error" class="text-red-500 text-xs mt-1">{{ v$.game.system_requirements.directx.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="storage" class="block text-white text-sm font-bold mb-2">Storage:</label>
              <input type="text" v-model="v$.game.system_requirements.storage.$model" :class="{'border-red-500': v$.game.system_requirements.storage.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.system_requirements.storage.$error" class="text-red-500 text-xs mt-1">{{ v$.game.system_requirements.storage.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="sound_card" class="block text-white text-sm font-bold mb-2">Sound Card:</label>
              <input type="text" v-model="v$.game.system_requirements.sound_card.$model" :class="{'border-red-500': v$.game.system_requirements.sound_card.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.system_requirements.sound_card.$error" class="text-red-500 text-xs mt-1">{{ v$.game.system_requirements.sound_card.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="category" class="block text-white text-sm font-bold mb-2">Category:</label>
              <input type="text" v-model="v$.game.category.$model" :class="{'border-red-500': v$.game.category.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.category.$error" class="text-red-500 text-xs mt-1">{{ v$.game.category.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="average_rating" class="block text-white text-sm font-bold mb-2">Average Rating:</label>
              <input type="number" v-model="v$.game.ratings.average_rating.$model" :class="{'border-red-500': v$.game.ratings.average_rating.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.ratings.average_rating.$error" class="text-red-500 text-xs mt-1">{{ v$.game.ratings.average_rating.$errors[0].$message }}</div>
            </div>
      
            <div>
              <label for="total_reviews" class="block text-white text-sm font-bold mb-2">Total Reviews:</label>
              <input type="number" v-model="v$.game.ratings.total_reviews.$model" :class="{'border-red-500': v$.game.ratings.total_reviews.$error}" class="w-full p-2 border border-gray-300 bg-[rgba(255,255,255,.1)] rounded"/>
              <div v-if="v$.game.ratings.total_reviews.$error" class="text-red-500 text-xs mt-1">{{ v$.game.ratings.total_reviews.$errors[0].$message }}</div>
            </div>
      
          </div>
          <div class="mt-6 text-center">
            <button type="submit" :disabled="v$.$invalid" class="bg-green-500 w-full text-white font-bold py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Add Game
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

import { apiService } from '@/services/apis';
import { useVuelidate } from '@vuelidate/core';
import {
  maxValue,
  minLength,
  minValue,
  numeric,
  required,
  url,
} from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      game: {
        id: '',
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
  validations() {
    return {
      game: {
        title: { required, minLength: minLength(3) },
        description: { required, minLength: minLength(10) },
        system_requirements: {
          os: { required },
          processor: { required },
          memory: { required },
          graphics: { required },
          directx: { required },
          storage: { required },
          sound_card: { required }
        },
        images: { required, $each: { required, url } },
        category: { required },
        ratings: {
          average_rating: { required, numeric, minValue: minValue(0), maxValue: maxValue(5) },
          total_reviews: { required, numeric, minValue: minValue(0) }
        }
      }
    };
  },
  methods: {
    async addGame() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        console.log('Form has errors');
        return;
      }

      this.game.id = uuidv4();
      try {
        const response = await apiService.addGame(this.game);
        console.log('Game added successfully:', response);
        alert('Game added successfully!');
        this.resetForm();
      } catch (error) {
        console.error('Error adding game:', error);
        alert('Failed to add game.');
      }
    },
    resetForm() {
      this.v$.$reset();
      this.game = {
        id: '',
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
      };
    }
  }
};
</script>