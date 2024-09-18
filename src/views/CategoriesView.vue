<template>
  <div>
    <div class="Categories px-20">
      <CategoryCards :categoryName="$route.params.categoryName" />
    </div>

    <div class="p-20 pb-0">
      <Slider></Slider>
    </div>
  </div>
</template>

<script>
import CategoryCards from '@/components/CategoryCards.vue';
import Slider from '@/components/Slider.vue';

export default {
  name: 'CategoriesView',
  components: {
    CategoryCards,
    Slider
  },
};
</script>
