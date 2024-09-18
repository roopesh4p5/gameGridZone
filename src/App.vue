<template>
  <header class="header">
    <a href="#" class="logo">Game Grid Zone</a>
    <i class='bx bx-menu' id="menu-icon" @click="toggleMenu">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg>
    </i>

    <!-- <div>
      <form class="">
        <label for="search">Search</label>
        <input required="" pattern=".*\S.*" autocomplete="off" type="search" class="input" id="search">
        <span class="caret"></span>
      </form>
    </div> -->
    
    <nav class="navbar  sm:bg-transparent bg-[rgba(255,255,255,.3)]" :class="{ active: isActive }">
      <router-link to="/">Home</router-link> 
      <router-link to="/category">Categories</router-link> 
      <router-link to="/addGame">Add Game</router-link> 
      <router-link to="/about">About</router-link> 

    </nav>
  </header>
  <router-view class=" pt-20" />
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body{
    min-height: 100vh;
    background: url('https://i.postimg.cc/XYjWrv36/dark-hexagonal-background-with-gradient-color-79603-1409.jpg') no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}

.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 100px;
    background: rgba(255, 255, 255, .1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(10px);
    border-bottom: 2px solid rgba(255, 255, 255, .2);
    z-index: 100;
}

.header::before{
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .4), transparent);
    transition: .5s;
}

.header:hover::before{
    left: 100%;
}

.logo{
    color: #fff;
    font-size: 25px;
    text-decoration: none;
    font-weight: 600;
    cursor: default;
}

.navbar a{
    color: #fff;
    font-size: 18px;
    text-decoration: none;
    margin-left: 45px;
    transition: .3s;
}

.navbar a:hover{
    color: #f00;
}

#menu-icon{
    font-size: 36px;
    color: #fff;
    display: none;
}

@media (max-width: 992px){
    .header{
        padding: 1.25rem 4%;
    }
}

@media (max-width: 768px){
    #menu-icon{
        display: block;
    }

    .navbar{
        position: fixed;
        top: 100%;
        left: 0;
        width: 100%;
        padding: 0.5rem 4%;
        display: none;
    }

    .navbar.active{
        display: block;
    }

    .navbar a{
        display: block;
        margin: 1.5rem 0;
    }

    .nav-bg{
        position: fixed;
        top: 8.5%;
        left: 0;
        width: 100%;
        height: 295px;
        background: rgba(255, 255, 255, .1);
        border-bottom: 2px solid rgba(255, 255, 255, .2);
        backdrop-filter: blur(10px);
        z-index: 99;
        display: none;
    }
    
    .nav-bg.active{
        display: block;
    }
  
}

nav a.router-link-exact-active {
  color: #42b983;
}


</style>
