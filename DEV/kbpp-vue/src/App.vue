<script setup lang="ts">
import Header from './components/Header.vue';
import { provideBuildContext } from '@/contexts/BuildContext';

provideBuildContext(); // Provide BuildContext globally
</script>

<template>
    <Header />
    <RouterView />
</template>

<style scoped>
    /* TODO */
</style>