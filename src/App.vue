<template>
  <div v-if="!isRegisterLoginRoute">
    <header class="header" :class="{ hidden: isRegisterLoginRoute }">
      <router-link class="logo cursor-pointer" to="/">Game Grid Zone</router-link>
      <i class="bx bx-menu" id="menu-icon" @click="toggleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </i>

      <nav
        class="navbar sm:bg-transparent bg-[rgba(255,255,255,.3)] flex items-center"
        :class="{ active: isActive }"
      >
        <div class="container">
          <div class="searchInput" :class="{ active: isSearchActive }">
        <input 
          type="text" 
          placeholder="Search Games..." 
          v-model="searchQuery"
          @input="onSearchInput"
          @focus="isSearchActive = true"
          @blur="onSearchBlur"
        >
        <div class="resultBox" v-if="filteredSuggestions.length">
          <ul>
            <li 
              v-for="suggestion in filteredSuggestions" 
              :key="suggestion"
              @click="selectSuggestion(suggestion)"
            >
              {{ suggestion }}
            </li>
          </ul>
        </div>
        <div class="icon"><i class="fas fa-search"></i></div>
      </div>
        </div>
        <router-link v-if="isLoggedIn" to="/category">Categories</router-link>
        <router-link v-if="isLoggedIn && isAdmin" to="/addGame">Add Game</router-link>
        <router-link to="/about">About</router-link>
        <div class="anchor">
          <button
            v-on:click="toggleSubMenu"
            class="pl-8 hover:text-[#ff4343] text-white"
            v-if="isLoggedIn"
          >
            Hello, {{ username }}!
          </button>
          <router-link v-else to="/RegisterLogin">SignIn/SignUp</router-link>
        </div>
        <div v-if="showSubMenu" class="absolute top-20 right-56 pl-2 w-0 h-0">
          <div class="w-auto min-w-40 p-2 rounded border-2 border-x-0 text-white bg-[rgba(255,255,255,.3)]">
            <ul>
              <li class="py-3 cursor-pointer" @click="profile">Profile</li>
              <li class="py-3 cursor-pointer" @click="logout">Logout</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
  <router-view class="pt-20" />
</template>

<script>
import 'vue-toast-notification/dist/theme-sugar.css';

import { useToast } from 'vue-toast-notification';

import { apiService } from '@/services/apis';

export default {
  setup() {
    const $toast = useToast();
    return { $toast }
  },
  data() {
    return {
      isActive: false,
      showSubMenu: false,
      searchQuery: '',
      isSearchActive: false,
      suggestions:[]
    };
  },
  computed: {
    isRegisterLoginRoute() {
      return this.$route.path === "/RegisterLogin";
    },
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
    isAdmin() {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user.role === 'admin';
      }
      return false;
    },
    username() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user ? user.username : "";
    },
    filteredSuggestions() {
      if (!this.searchQuery) return [];
      return this.suggestions.filter(suggestion =>
        suggestion.toLowerCase().startsWith(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
    toggleSubMenu() {
      this.showSubMenu = !this.showSubMenu;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$toast.success('Logged out successfully', {
        duration: 2000,
      });
      this.showSubMenu = false;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    profile() {
      this.showSubMenu = false;
      this.$router.push("/profile");
    },
    async onSearchInput() {
      this.isSearchActive = true;
      if (this.searchQuery.length >= 2) { // Call API if query is at least 2 characters
        try {
          const suggestions = await apiService.searchGames(this.searchQuery);
          this.suggestions = suggestions; // Set the suggestions based on the API response
        } catch (error) {
          console.error('Failed to fetch game titles:', error);
          this.$toast.error('Error fetching game titles', {
            duration: 2000,
          });
          this.suggestions = []; // Clear suggestions on error
        }
      } else {
        this.suggestions = []; // Clear suggestions if query is too short
      }
    },
    onSearchBlur() {
      // Delay hiding the search results to allow for clicking on suggestions
      setTimeout(() => {
        this.isSearchActive = false;
      }, 200);
    },
    selectSuggestion(suggestion) {
    this.searchQuery = suggestion;
    this.isSearchActive = false;
    this.$router.push({ 
      name: 'Search', 
      query: { q: suggestion }})
      setTimeout(() => {
        window.location.reload()
      }, 100);
      }

    }
  };
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  min-height: 100vh;
  background: url("https://i.postimg.cc/XYjWrv36/dark-hexagonal-background-with-gradient-color-79603-1409.jpg")
    no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 100px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  z-index: 100;
}

.header::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: 0.5s;
}

.header:hover::before {
  left: 100%;
}

.logo {
  color: #fff;
  font-size: 25px;
  text-decoration: none;
  font-weight: 600;
  cursor: default;
}

.navbar a {
  color: #fff;
  font-size: 18px;
  text-decoration: none;
  margin-left: 45px;
  transition: 0.3s;
}

.navbar a:hover {
  color: #f00;
}

#menu-icon {
  font-size: 36px;
  color: #fff;
  display: none;
}

@media (max-width: 992px) {
  .header {
    padding: 1.25rem 4%;
  }
}

@media (max-width: 768px) {
  #menu-icon {
    display: block;
  }

  .navbar {
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 0.5rem 4%;
    display: none;
  }

  .navbar.active {
    display: block;
  }

  .navbar a {
    display: block;
    margin: 1.5rem 0;
  }

  .nav-bg {
    position: fixed;
    top: 8.5%;
    left: 0;
    width: 100%;
    height: 295px;
    background: rgba(255, 255, 255, 0.1);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    z-index: 99;
    display: none;
  }

  .nav-bg.active {
    display: block;
  }
}

nav a.router-link-exact-active {
  color: #42b983;
}



.container{
  max-width: 450px;
  margin: auto;
}

.container .searchInput{
  background: #fff;
  width: 100%;
  border-radius: 5px;
  position: relative;
  box-shadow: 0px 1px 5px 3px rgba(0,0,0,0.12);
}

.searchInput input{
  height: 35px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0 60px 0 20px;
  font-size: 18px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
}

.searchInput.active input{
  border-radius: 5px 5px 0 0;
}

.searchInput .resultBox{
  padding: 0;
  opacity: 0;
  position: absolute;
  background-color: white;
  pointer-events: none;
  min-width: 300px;
  max-height: 280px;
  overflow-y: auto;
}

.searchInput.active .resultBox{
  padding: 10px 8px;
  opacity: 1;
  pointer-events: auto;
}

.resultBox li{
  list-style: none;
  padding: 8px 12px;
  display: none;
  width: 100%;
  cursor: default;
  border-radius: 3px;
}

.searchInput.active .resultBox li{
  display: block;
}
.resultBox li:hover{
  background: #efefef;
}

.searchInput .icon{
  position: absolute;
  right: 0px;
  top: 0px;
  height: 55px;
  width: 55px;
  text-align: center;
  line-height: 55px;
  font-size: 20px;
  color: #644bff;
  cursor: pointer;
}
</style>
