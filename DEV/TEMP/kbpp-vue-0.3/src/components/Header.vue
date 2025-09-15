<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur"
    style="background-color: rgba(16, 18, 20, 0.98)"
  >
    <div class="container flex h-16 items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-md"
          style="background: var(--linearPrimarySecondary)"
        >
          <SparklesIcon class="h-5 w-5 text-white" />
        </div>
        <span
          class="font-bold text-xl bg-clip-text text-transparent"
          style="background: var(--linearPrimarySecondary); background-clip: text"
        >
          KBPartPicker
        </span>
      </router-link>

      <!-- Navigation -->
      <nav class="flex">
        <ul class="flex space-x-4">
          <li v-for="item in navigationItems" :key="item.name">
            <router-link
              :to="item.href"
              class="group inline-flex h-10 items-center px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon class="h-4 w-4 mr-2" />
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Auth Buttons -->
      <div class="flex items-center space-x-3">
        <button v-if="!isAuthenticated" @click="handleSignIn" class="btn-ghost">
          Sign In
        </button>
        <button v-if="!isAuthenticated" @click="handleSignUp" class="btn-primary">
          Sign Up
        </button>
        <div v-else>
          <router-link to="/saved" class="btn-outline">
            Manage Builds
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SparklesIcon } from '@heroicons/vue/24/outline'; // Replace with your icon library

const isAuthenticated = ref(false);
const navigationItems = [
  { name: 'Builder', href: '/builder', icon: SparklesIcon },
  { name: 'Builds', href: '/builds', icon: SparklesIcon },
  { name: 'Pulse', href: '/pulse', icon: SparklesIcon },
  { name: 'Forum', href: '/forum', icon: SparklesIcon },
];

const handleSignIn = () => {
  console.log('Sign In clicked');
};

const handleSignUp = () => {
  console.log('Sign Up clicked');
};
</script>

<style scoped>
.btn-ghost {
  /* Add styles for ghost button */
}
.btn-primary {
  background: var(--linearPrimarySecondary);
  color: white;
  /* Add hover and transition styles */
}
.btn-outline {
  /* Add styles for outline button */
}
</style>