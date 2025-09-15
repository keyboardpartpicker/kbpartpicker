<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useBuildContext } from '@/contexts/BuildContext';

export default defineComponent({
    name: 'Builder',
    setup() {
        const switches = ref<Array<{ id: number; name: string; type: string; url: string }>>([]);
        const { selectedParts, addPart } = useBuildContext();

        const selectedSwitches = computed(() =>
            selectedParts
                .filter(part => part.type === 'switches')
                .map(part => switches.value.find(sw => sw.id === part.id))
                .filter(Boolean)
        );

        const fetchSwitches = async () => {
            try {
                const response = await fetch('/api/switches');
                const data = await response.json();
                switches.value = data;
            } catch (error) {
                console.error('Error loading switches:', error);
            }
        };

        const handleAdd = (id: number) => {
            addPart({ id, type: 'switches' });
        };

        onMounted(fetchSwitches);

        return {
            switches,
            handleAdd,
            selectedSwitches
        };
    }
});
</script>

<template>
    <div>
        <h1>Builder Page - ALPHA</h1>
        <br>

        <h2>Switches</h2>
        <ul>
            <li v-for="switchItem in switches" :key="switchItem.id">
                {{ switchItem.name }} ({{ switchItem.type }}) – {{ switchItem.url }}
                <button @click="handleAdd(switchItem.id)">Add</button>
            </li>
        </ul>

        <br>
        <h2>Selected Switches</h2>
        <table v-if="selectedSwitches.length">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sw in selectedSwitches" :key="sw!.id">
                    <td>{{ sw!.id }}</td>
                    <td>{{ sw!.name }}</td>
                    <td>{{ sw!.type }}</td>
                    <td><a :href="sw!.url" target="_blank">Link</a></td>
                </tr>
            </tbody>
        </table>
        <p v-else>No switches added yet.</p>
    </div>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}
th, td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}
button {
    margin-left: 1rem;
}
</style>
