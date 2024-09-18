import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import GameDesc from '@/views/GameDesc.vue'; // Ensure this path is correct

import HomeView from '../views/HomeView.vue';

// Define your routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/category',
    name: 'categories', // Renamed to 'categories' to avoid duplicate route names
    component: () => import(/* webpackChunkName: "categories" */ '../views/CategoriesView.vue')
  },
  {
    path: '/category/:categoryName',
    name: 'category-detail', // Changed the name to 'category-detail' to make it unique
    component: () => import(/* webpackChunkName: "category-detail" */ '../views/CategoryDetailView.vue')
  },
  {
    path: '/category/:categoryName/:gameTitle',
    name: 'GameDesc',
    component: GameDesc,
    props: true
  },
  {
    path: '/addGame',
    name: 'AddGames',
    component: () => import(/* webpackChunkName: "category-detail" */ '../views/AddGames.vue')
  }
];

// Create and export the router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
