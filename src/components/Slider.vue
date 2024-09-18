<template>
    <div class="slider rounded-2xl">
      <div class="slides" :style="slidesStyle">
        <div class="slide" v-for="slide in slides" :key="slide.id">
          <img :src="slide.image" :alt="slide.title" />
          <div class=" caption rounded-lg">
            <h2 class="text-2xl font-bold ">{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
      <button class="control prev" @click="prevSlide">❮</button>
      <button class="control next" @click="nextSlide">❯</button>
    </div>
  </template>
  
  <script>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

import axios from 'axios';

export default {
    name: 'CarouselSlider',
    props: {
      autoplay: {
        type: Boolean,
        default: true
      },
      autoplayDelay: {
        type: Number,
        default: 5000
      }
    },
    setup(props) {
      const slides = ref([]);
      const currentSlide = ref(0);
      let intervalId = null;
  
      const slidesStyle = computed(() => ({
        transform: `translateX(-${currentSlide.value * 100}%)`,
        transition: 'transform 0.5s ease'
      }));
  
      const nextSlide = () => {
        if (slides.value.length > 0) {
          currentSlide.value = (currentSlide.value + 1) % slides.value.length;
        }
      };
  
      const prevSlide = () => {
        if (slides.value.length > 0) {
          currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
        }
      };
  
      const startAutoplay = () => {
        if (props.autoplay) {
          intervalId = setInterval(nextSlide, props.autoplayDelay);
        }
      };
  
      const stopAutoplay = () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
  
      onMounted(async () => {
        try {
          const response = await axios.get('http://localhost:3000/slider');
          slides.value = response.data; // Directly assign the array
          startAutoplay();
        } catch (error) {
          console.error('Error fetching slides:', error);
        }
      });
  
      onUnmounted(() => {
        stopAutoplay();
      });
  
      return {
        slides,
        currentSlide,
        slidesStyle,
        nextSlide,
        prevSlide
      };
    }
  };
  
</script>


<style scoped>
.slider {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px; /* Adjust as needed */
}
.slides {
  display: flex;
  width: 100%;
  height: 100%;
}
.slide {
  min-width: 100%;
  box-sizing: border-box;
  position: relative;
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.caption {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(255, 255, 255, .2);  padding: 10px;
}
.control {
  position: absolute;
  top: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  transform: translateY(-50%);
}
.prev {
  left: 10px;
}
.next {
  right: 10px;
}


 
 

</style>
