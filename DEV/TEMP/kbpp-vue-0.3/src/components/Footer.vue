<template>
  <footer class="border-t" style="background-color: hsl(220 8% 9%)">
    <div class="container py-16">
      <div class="grid grid-cols-2 md:grid-cols-6 gap-8">
        <!-- Logo and Description -->
        <div class="col-span-2">
          <router-link to="/" class="flex items-center space-x-2 mb-4">
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
          <p class="text-muted-foreground text-sm mb-6 max-w-xs">
            Build keyboards with our cutting-edge platform. Designed to bring
            your dream build to life with precision.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <social.icon class="h-5 w-5" />
              <span class="sr-only">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <!-- Footer Sections -->
        <div v-for="section in footerSections" :key="section.title">
          <h3 class="font-semibold text-foreground mb-4">{{ section.title }}</h3>
          <ul class="space-y-3">
            <li v-for="link in section.links" :key="link.name">
              <router-link
                :to="link.href"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <hr class="my-8" />

      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-muted-foreground">
          © 2025 KBPartPicker. All rights reserved.
        </p>
        <div class="flex items-center space-x-6 mt-4 md:mt-0">
          <router-link to="/privacy" class="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </router-link>
          <router-link to="/terms" class="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </router-link>
          <router-link to="/cookies" class="text-sm text-muted-foreground hover:text-foreground">
            Cookies
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SparklesIcon } from '@heroicons/vue/24/outline'; // Replace with your icon library

const footerSections = [
  {
    title: 'KBPP',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' },
    ],
  },
];

const socialLinks = [
  { name: 'GitHub', icon: SparklesIcon, href: 'https://github.com' },
  { name: 'Email', icon: SparklesIcon, href: 'mailto:business@kbpartpicker.app' },
];
</script>

<style scoped>
/* Add any additional styles here */
</style>