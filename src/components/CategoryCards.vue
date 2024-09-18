<template>
  <div
    class=" flex  flex-wrap gap-5 pt-12 sm:flex-row  flex-col "
  >
    <router-link
      class="card"
      v-for="(item, index) in cards"
      :key="index"
      :to="`/category/${item.category}`"
      alt="Mythrill"
      
    >
      <div>
        <div class="wrapper">
          <img :src="item.coverImage" class="cover-image" />
        </div>
        <img :src="item.titleImage" class="title" />
        <img :src="item.characterImage" class="character" />
      </div>
    </router-link>
  </div>


</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          category: "action",
          coverImage: require("@/assets/action-cover.jpg"),
          titleImage: require("@/assets/action-title.png"),
          characterImage: require("@/assets/action-character.webp"),
        },
        {
          category: "fighting",
          coverImage: require("@/assets/fighting-cover.jpg"),
          titleImage: require("@/assets/fighting-title.png"),
          characterImage: require("@/assets/fighting-character.png"),
        },
     
        {
          category: "horror",
          coverImage: require("@/assets/horror-cover.jpg"),
          titleImage: require("@/assets/horror-title.png"),
          characterImage: require("@/assets/horror-character.png"),
        },
        {
          category: "survival",
          coverImage: require("@/assets/survival-cover.jpg"),
          titleImage: require("@/assets/survival-title.png"),
          characterImage: require("@/assets/survival-character.webp"),
        },
        {
          category: "racing",
          coverImage: require("@/assets/racing-cover.jpg"),
          titleImage: require("@/assets/racing-title.png"),
          characterImage: require("@/assets/racing-character.png"),
        }
        // Add more categories as needed
      ],
    };
  },
};
</script>


<style scoped>


.card {
  min-height: 19rem;
 min-width: 12.5rem;
 max-height: 19rem;
 max-width: 12.5rem;
  display: flex;
  justify-content: center;
margin: auto;
  perspective: 2500px;
  /* margin: 100px 50px 250px 50px; */
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wrapper {
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  z-index: -1;
}

.card:hover .wrapper {
  transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
  box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
}

.wrapper::before,
.wrapper::after {
  content: "";
  opacity: 0;
  width: 100%;
  height: 80px;
  transition: all 0.5s;
  position: absolute;
  left: 0;
}
.wrapper::before {
  top: 0;
  height: 100%;
  background-image: linear-gradient(
    to top,
    transparent 46%,
    rgba(12, 13, 19, 0.5) 68%,
    rgba(12, 13, 19) 97%
  );
}
.wrapper::after {
  bottom: 0;
  opacity: 1;
  background-image: linear-gradient(
    to bottom,
    transparent 46%,
    rgba(12, 13, 19, 0.5) 68%,
    rgba(12, 13, 19) 97%
  );
}

.card:hover .wrapper::before,
.wrapper::after {
  opacity: 1;
}

.card:hover .wrapper::after {
  height: 120px;
}
.title {
  width: 100%;
  transition: transform 0.5s;
}
.card:hover .title {
  transform: translate3d(0%, -50px, 100px);
}

.character {
  width: 100%;
  
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  z-index: -1;
}

.card:hover .character {
  opacity: 1;
  transform: translate3d(0%, -30%, 100px);
}
</style>

