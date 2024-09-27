<template>
  <div class="home">
     <div v-if="isLoggedIn" class="mx-20 py-20">
       <Slider ></Slider>
     </div>
    <Cards class="mt-2"></Cards>
  </div>
</template>

<script>
import Cards from '@/components/Cards.vue';
import Slider from '@/components/Slider.vue';

export default {
  name: 'HomeView',
  components: {
    Slider,
    Cards
  },
  computed:{
    isLoggedIn() {
      return !!localStorage.getItem("token");
    }
  }
}
</script>
