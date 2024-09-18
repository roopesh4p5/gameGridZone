<template>
  <div class="home">
    <!-- this is home page -->
     <div class="mx-20 py-20">
       <Slider></Slider>
     </div>
    <Cards></Cards>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Cards from '@/components/Cards.vue';
import Slider from '@/components/Slider.vue';

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
    Slider,
    Cards
  }
}
</script>
