<template>
    <div class="bg-[rgba(255,255,255,.1)] text-white m-12 mt-24 p-5">
      <main class="flex">
        <div class="w-2/3 pr-4">
          <div class="flex items-center mb-4">
            <img src="https://i.pinimg.com/736x/1a/c0/42/1ac04253466c4c1682700cd38e9594d1.jpg" alt="Profile" class="w-24 h-24 rounded-full mr-4" />
            <div>
              <h2 class="text-2xl font-bold">{{ username }}</h2>
              <p>Level <span class="bg-green-500 rounded-full px-2">{{ userLevel }}</span></p>
            </div>
          </div>
          
          <div class="flex justify-between mb-4 mr-20">
            <div v-for="(stat, index) in stats" :key="index">
              <p class="text-3xl font-bold">{{ stat.value }}</p>
              <p class="text-sm">{{ stat.label }}</p>
            </div>
          </div>
          
          <!-- <div class="mb-4">
            <h3 class="text-xl mb-2">Featured Games</h3>
            <div class="flex space-x-2">
              <img v-for="game in featuredGames" :key="game.id" :src="game.image" :alt="game.name" class="w-1/4 h-20 object-cover" />
            </div>
          </div> -->
          
          <div>
            <h3 class="text-xl mb-2">Recent Activity</h3>
            <div v-for="activity in recentActivities" :key="activity.id" class="bg-[rgba(255,255,255,.3)] p-2 rounded mb-2">
              <p>{{ activity.name }}</p>
              <p class="text-sm text-gray-400">{{ activity.hours }} hrs on record</p>
            </div>
          </div>
        </div>
        
        <div class="w-1/3">
          <p>Currently Online</p>
          <div class="mb-4">
            <p>Badges {{ badges.length }}</p>
            <div class="flex space-x-2">
              <div v-for="badge in badges.slice(0, 3)" :key="badge.id" class="bg-gray-700 w-8 h-8 rounded"></div>
            </div>
          </div>
          <div class="mb-4">
            <p v-for="(item, index) in profileItems" :key="index">{{ item }}</p>
          </div>
          <div>
            <p>Groups {{ groups.length }}</p>
            <div v-for="group in groups" :key="group.id" class="bg-[rgba(255,255,255,.3)] p-2 rounded mb-2">
              <p>{{ group.name }}</p>
              <p class="text-sm text-gray-400">{{ group.members }} Members</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
import {
  onMounted,
  ref,
} from 'vue';

export default {
    setup() {
      const username = ref('');
      const userLevel = ref(0);
      const userAvatar = ref('');
      const stats = ref([]);
      const featuredGames = ref([]);
      const recentActivities = ref([]);
      const badges = ref([]);
      const profileItems = ref([]);
      const groups = ref([]);
  
      const loadUserData = () => {
        const userString = localStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          username.value = user.username;
          
          // Simulating fetching additional user data
          userLevel.value = Math.floor(Math.random() * 100) + 1;
          userAvatar.value = `/api/placeholder/100/100?text=${user.username}`;
          
          stats.value = [
            { value: Math.floor(Math.random() * 1000), label: 'Games Owned' },
            { value: Math.floor(Math.random() * 500), label: 'DLC Owned' },
            { value: Math.floor(Math.random() * 100), label: 'Wishlisted' }
          ];
  
          featuredGames.value = Array(4).fill().map((_, i) => ({
            id: i + 1,
            name: `Game ${i + 1}`,
          }));
  
          recentActivities.value = [
            { id: 1, name: 'GTA 5', hours: (Math.random() * 20).toFixed(1) },
            { id: 2, name: 'Last of Us', hours: (Math.random() * 20).toFixed(1) }
          ];
  
          badges.value = Array(16).fill().map((_, i) => ({ id: i + 1 }));
  
          profileItems.value = [
            `Games ${stats.value[0].value}`, 'Inventory', 'Screenshots', 'Videos', 'Workshop Items',
            'Reviews', 'Guides', 'Artwork'
          ];
  
          groups.value = [
            { id: 1, name: 'Gaming Group 1', members: Math.floor(Math.random() * 1000) },
            { id: 2, name: 'Gaming Group 2', members: Math.floor(Math.random() * 1000) }
          ];
        }
      };
  
      onMounted(() => {
        loadUserData();
      });
  
      return {
        username,
        userLevel,
        userAvatar,
        stats,
        featuredGames,
        recentActivities,
        badges,
        profileItems,
        groups
      };
    }
  };
  
</script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>