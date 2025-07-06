<script>
    export default {
        name: 'Builder',
        data() {
            return {
                switches: [],
            };
        },
        async mounted() {
            try {
                const response = await fetch('/api/switches');
                const data = await response.json();
                this.switches = data;
            } catch (error) {
                console.error('Error loading switches:', error);
            }
        },
    };
</script>

<template>
    <div>
        <h1>Builder Alpha</h1>
        <br>
        <h2>Switches</h2>
        <ul>
            <li v-for="switchItem in switches" :key="switchItem.id">
                {{ switchItem.name }} ({{ switchItem.type }}) – {{ switchItem.sound_profile }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
    /* STYLE */
</style>