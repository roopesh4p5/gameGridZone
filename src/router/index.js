import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import GameDesc from '@/views/GameDesc.vue'; // Ensure this path is correct
import LoginRegister from '@/views/LoginRegister.vue';

import HomeView from '../views/HomeView.vue';

// Define your routes
const routes = [
  {
    path: '/RegisterLogin',
    name: 'loginregister',
    component: LoginRegister
  },
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
    name: 'categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/CategoriesView.vue'),
    meta: { requiresAuth: true } // Add meta field
  },
  {
    path: '/category/:categoryName',
    name: 'category-detail',
    component: () => import(/* webpackChunkName: "category-detail" */ '../views/CategoryDetailView.vue'),
    meta: { requiresAuth: true } // Add meta field
  },
  {
    path: '/category/:categoryName/:gameTitle',
    name: 'GameDesc',
    component: GameDesc,
    props: true,
    meta: { requiresAuth: true } // Add meta field
  },
  {
    path: '/search',
    name: 'Search',
    component: GameDesc,
    props: (route) => ({ gameTitle: route.query.q }),
    meta: { requiresAuth: true }
  },
  {
    path: '/addGame',
    name: 'AddGames',
    component: () => import(/* webpackChunkName: "add-games" */ '../views/AddGames.vue'),
    meta: { requiresAuth: true } // Add meta field
  },
  {
    path: '/profile',
    name: 'profilePage',
    component: () => import('../views/ProfilePage.vue'),
    meta: { requiresAuth: true }
  }
];

// Create and export the router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'loginregister' }); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
