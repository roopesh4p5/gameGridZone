<template>
    <div class="h-[calc(100vh-100px)] w-full flex items-center justify-center">
      <div class="relative w-96 h-[600px]" style="perspective: 1000px;">
        <div
          class="w-full h-full transition-transform duration-700"
          :class="{ 'rotate-y-180': isFlipped }"
          style="transform-style: preserve-3d;"
        >
          <!-- Login Form -->
          <div class="absolute w-full min-h-[400px] max-h-[480px] h-auto bg-white bg-opacity-10 rounded-lg backdrop-blur-md border border-white border-opacity-10 shadow-lg p-8" style="backface-visibility: hidden;">
            <h3 class="text-3xl font-medium text-center text-white mb-6">Login Here</h3>
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div>
                <label for="username" class="block text-white mb-2">Username</label>
                <input v-model="loginForm.username" type="text" id="username" placeholder="Username" class="w-full bg-white bg-opacity-5 rounded px-3 py-2 text-white placeholder-gray-300">
                <span v-if="v$.loginForm.username.$error" class="text-red-400 text-sm">{{ v$.loginForm.username.$errors[0].$message }}</span>
              </div>
              <div>
                <label for="password" class="block text-white mb-2">Password</label>
                <input v-model="loginForm.password" type="password" id="password" placeholder="Password" class="w-full bg-white bg-opacity-5 rounded px-3 py-2 text-white placeholder-gray-300">
                <span v-if="v$.loginForm.password.$error" class="text-red-400 text-sm">{{ v$.loginForm.password.$errors[0].$message }}</span>
              </div>
              <button type="submit" class="w-full bg-white text-gray-900 py-2 rounded font-semibold mt-4">Log In</button>
            </form>
            <div class="text-center mt-6">
              <p class="text-white">New User? <button @click="handleFlip" class="text-blue-300">Sign up</button></p>
            </div>
          </div>
  
          <!-- Register Form -->
          <div class="absolute w-full min-h-[500px]  max-h-[600px] h-auto bg-white bg-opacity-10 rounded-lg backdrop-blur-md border border-white border-opacity-10 shadow-lg p-8 rotate-y-180" style="backface-visibility: hidden;">
            <h3 class="text-3xl font-medium text-center text-white mb-6">Register Here</h3>
            <form @submit.prevent="handleRegister" class="space-y-4">
              <div>
                <label for="reg-username" class="block text-white mb-2">Username</label>
                <input v-model="registerForm.username" type="text" id="reg-username" placeholder="Username" class="w-full bg-white bg-opacity-5 rounded px-3 py-2 text-white placeholder-gray-300">
                <span v-if="v$.registerForm.username.$error" class="text-red-400 text-sm">{{ v$.registerForm.username.$errors[0].$message }}</span>
              </div>
              <div>
                <label for="reg-email" class="block text-white mb-2">Email</label>
                <input v-model="registerForm.email" type="email" id="reg-email" placeholder="Email" class="w-full bg-white bg-opacity-5 rounded px-3 py-2 text-white placeholder-gray-300">
                <span v-if="v$.registerForm.email.$error" class="text-red-400 text-sm">{{ v$.registerForm.email.$errors[0].$message }}</span>
              </div>
              <div>
                <label for="reg-password" class="block text-white mb-2">Password</label>
                <input v-model="registerForm.password" type="password" id="reg-password" placeholder="Password" class="w-full bg-white bg-opacity-5 rounded px-3 py-2 text-white placeholder-gray-300">
                <span v-if="v$.registerForm.password.$error" class="text-red-400 text-sm">{{ v$.registerForm.password.$errors[0].$message }}</span>
              </div>
              <button type="submit" class="w-full bg-white text-gray-900 py-2 rounded font-semibold mt-4">Sign Up</button>
            </form>
            <div class="text-center mt-6">
              <p class="text-white">Already have an account? <button @click="handleFlip" class="text-blue-300">Log in</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script>
import 'vue-toast-notification/dist/theme-sugar.css';

import { useToast } from 'vue-toast-notification';

import { apiService } from '@/services/apis';
import { useVuelidate } from '@vuelidate/core';
import {
  email,
  minLength,
  required,
} from '@vuelidate/validators';

export default {
  setup() {
    const $toast = useToast();
    return { v$: useVuelidate(), $toast }
  },
  data() {
    return {
      isFlipped: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  validations() {
    return {
      loginForm: {
        username: { required },
        password: { required, minLength: minLength(6) }
      },
      registerForm: {
        username: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    }
  },
  methods: {
    handleFlip() {
      this.isFlipped = !this.isFlipped;
    },
    async handleLogin() {
        this.v$.$touch();
      if (this.v$.loginForm.$invalid) {
        this.$toast.error('Please fill in all required fields correctly');
        return;
      }
      try {
        const response = await apiService.login(this.loginForm);
        if (response && response.token) {
          this.$toast.success('Login successful');
          localStorage.setItem('token', response.token);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          this.$emit('login-success', response.user);
          this.$router.push('/'); 
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.$toast.error(error.response?.data?.message || 'Login failed. Please try again.');
      }
    },
    async handleRegister() {
      this.v$.$touch();
      if (this.v$.registerForm.$invalid) {
        this.$toast.error('Please fill in all required fields correctly');
        return;
      }
      try {
        await apiService.register(this.registerForm);
        this.$toast.success('Registration successful');
        this.handleFlip(); // Flip back to login form
      } catch (error) {
        console.error('Registration failed:', error);
        this.$toast.error('Registration failed. Please try again.');
      }
    }
  }
}
</script>

  <style scoped>
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  </style>