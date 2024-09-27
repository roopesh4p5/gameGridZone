<template>
    <div class="game-desc mt-24 mb-10 p-6 bg-[rgba(255,255,255,.1)]  rounded-lg shadow-lg max-w-3xl mx-auto" v-if="game && game.title">
      <!-- Game Title -->
      <h1 class="text-3xl font-bold text-white mb-4 flex items-center">
        <!-- <button @click="backfunction()" class="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
          </button> -->
        {{ game.title }}</h1>
      
      <!-- Display main image -->
      <div v-if="game.images && game.images.length" class="relative">
        <div class="flex justify-center">
            <img :src="game.images[0]" alt="Game Image" class="w-2/3 rounded-lg shadow-md" />
        </div>


        <!-- Optional: Display additional images if needed -->
      </div>
    
  
      <!-- Game Details -->
      <div class="game-details mt-6">
        <p class="text-white mb-10"><span class="font-semibold">Description:</span> {{ game.description }}</p>
        <p class="text-white mb-2"><span class="font-semibold">Rating:</span> {{ game.ratings ? game.ratings.average_rating : 'N/A' }} / 10</p>
        <p class="text-white mb-10"><span class="font-semibold">Total Reviews:</span> {{ game.ratings ? game.ratings.total_reviews : 'N/A' }}</p>
      

        <div class="flex justify-center">
            <img src="./../assets/caution.jpg" alt="">
         </div>
        <!-- System Requirements -->
        <div v-if="game.system_requirements" class="system-requirements pb-10">
          <h2 class="text-xl font-semibold text-white mb-4">System Requirements</h2>
          <ul class="list-disc pl-5 space-y-1">
            <li class="text-white"><span class="font-semibold">OS:</span> {{ game.system_requirements.os || 'N/A' }}</li>
            <li class="text-white"><span class="font-semibold">Processor:</span> {{ game.system_requirements.processor || 'N/A' }}</li>
            <li class="text-white"><span class="font-semibold">Memory:</span> {{ game.system_requirements.memory || 'N/A' }}</li>
            <li class="text-white"><span class="font-semibold">Graphics:</span> {{ game.system_requirements.graphics || 'N/A' }}</li>
            <li class="text-white"><span class="font-semibold">DirectX:</span> {{ game.system_requirements.directx || 'N/A' }}</li>
            <li class="text-white"><span class="font-semibold">Storage:</span> {{ game.system_requirements.storage || 'N/A' }}</li>
            <li class="text-white"><span class="font-semibold">Sound Card:</span> {{ game.system_requirements.sound_card || 'N/A' }}</li>
          </ul>
        </div>

        <p class="text-white mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis placeat perferendis aliquam rem quia ex temporibus cupiditate illo dignissimos officiis magni quis alias quam non, omnis voluptatum sunt ab saepe eligendi odio veniam? Quae temporibus nostrum sunt exercitationem voluptatibus, id illum aliquid reiciendis accusamus dolore!</p>
        <div class="flex justify-center mb-10">
          <button class="button" v-on:click="downloadGameDetails()">DOWNLOAD</button>
          </div>
        <p class="text-white mb-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias quibusdam natus ipsum deserunt consectetur voluptas ipsa suscipit aliquid odit, fuga aperiam sunt ullam voluptatibus at sint rerum mollitia facere a dolorum est?</p>

      </div>
    </div>
  </template>
  
  
  <script>
import { apiService } from '@/services/apis';

export default {
  props: ['categoryName', 'gameTitle'],
  data() {
    return {
      game: {}
    };
  },
  methods: {
    async fetchGameDetails() {
      try {
        console.log("hiiiiii")
        this.game = await apiService.getGameByTitle(this.gameTitle)
        console.log(this.game,"this.game single")
        console.log("hiiiiii")

      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    },
    backFunction() {
      this.$router.beforeEach;
    },
    downloadGameDetails() {
      const fileContent = JSON.stringify(this.game, null, 2);
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${this.game.title}_details.txt`;
      link.click();
    }
  },
  created() {
    this.fetchGameDetails();
  }
};
</script>
 
 
 <style scoped>
  .game-desc {
    padding: 1rem;
  }
  
  .game-details {
    margin-top: 1rem;
  }

  

  @import url(https://fonts.googleapis.com/css?family=Bungee);
.button {
  background-color: #cbf3f0;
  border-radius: 50px;
  color: #11534d;
  border: 3px solid #2ec4b6;
  line-height: 1;
  font-size: 20px;
  margin-left: 0;
  margin-right: 0;
  padding: 20px 25px;
  font-family: "Bungee";
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  min-width: 200px;
  text-align: center;
}
button:hover,
button:focus {
  -webkit-animation-name: wobble;
  animation-name: wobble;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

@-webkit-keyframes wobble {
  16.65% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }
  33.3% {
    -webkit-transform: translateX(-6px);
    transform: translateX(-6px);
  }
  49.95% {
    -webkit-transform: translateX(4px);
    transform: translateX(4px);
  }
  66.6% {
    -webkit-transform: translateX(-2px);
    transform: translateX(-2px);
  }
  83.25% {
    -webkit-transform: translateX(1px);
    transform: translateX(1px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes wobble {
  16.65% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }
  33.3% {
    -webkit-transform: translateX(-6px);
    transform: translateX(-6px);
  }
  49.95% {
    -webkit-transform: translateX(4px);
    transform: translateX(4px);
  }
  66.6% {
    -webkit-transform: translateX(-2px);
    transform: translateX(-2px);
  }
  83.25% {
    -webkit-transform: translateX(1px);
    transform: translateX(1px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

  </style>
  